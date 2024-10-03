'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

export default function Dashboard({ user }) {
    const [haiku, setHaiku] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHaiku = async () => {
            try {
                const response = await fetch(`/api/haikus?userId=${user.userId}`);
                const data = await response.json();
                setHaiku(data);
            } catch (error) {
                console.error('Error fetching haikus', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHaiku();
    }, [user.userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-8">Your Haikus</h1>
            {haiku.length === 0 ? (
                <p className="text-center text-gray-500">
                    You have no haikus yet. <Link href="/create-haiku" className="text-blue-500 underline">Create one!</Link>
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {haiku.map((haikuItem, ind) => (
                        <div key={ind} className="relative bg-white border rounded-lg shadow-md overflow-hidden">
                            <div className="relative w-full h-64">
                                <CldImage
                                    fillBackground
                                    width="1335"
                                    height="891"
                                    src={haikuItem.photo}
                                    sizes="100vw"
                                    overlays={[{
                                        position: {
                                            x: 50,
                                            y: 50,
                                            angle: 0,
                                            gravity: 'center',
                                        },
                                        text: {
                                            color: 'black',
                                            fontFamily: 'Source Sans Pro',
                                            fontSize: 42,
                                            fontWeight: 'bold',
                                            textDecoration: 'underline',
                                            letterSpacing: 2,
                                            lineSpacing: 10,
                                            text: `${haikuItem.line1}\n${haikuItem.line2}\n${haikuItem.line3}`
                                        }
                                    }]}
                                    alt={`Haiku Image ${ind + 1}`}
                                />
                            </div>
                            <div className="p-4 text-sm bg-gray-800 text-white">
                                <h2 className="text-lg font-semibold mb-2">Haiku {ind + 1}</h2>
                                <p className="italic mb-1">{haikuItem.line1}</p>
                                <p className="italic mb-1">{haikuItem.line2}</p>
                                <p className="italic">{haikuItem.line3}</p>
                            </div>
                            <div className="p-4 flex justify-end">
                                <Link href={`/edit-haiku/${haikuItem._id.toString()}`}>
                                    <button className="btn btn-primary">Edit</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
