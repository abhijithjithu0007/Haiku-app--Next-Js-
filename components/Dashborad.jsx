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
                console.error('error fetching haikus', error);
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
            <h1 className="text-3xl font-bold text-center mb-8">Your Haikus</h1>
            {haiku.length === 0 ? (
                <p className="text-center text-gray-500">
                    You have no haikus yet. <Link href="/create-haiku" className="text-blue-500 underline">Create one!</Link>
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {haiku.map((haiku, ind) => (
                        <div key={ind} className="relative bg-white border rounded-lg shadow-md overflow-hidden">
                            <div className="relative w-full h-64">
                                <CldImage
                                    className="absolute inset-0 object-cover w-full h-full"
                                    width="650"
                                    height="300"
                                    src={haiku.photo}
                                    alt={`Haiku Image ${ind + 1}`}
                                    fillBackground
                                    crop={{ type: 'pad', source: true }}
                                />


                            </div>
                            <div className="p-4 text-sm bg-gray-800 text-white">
                                <h2 className="text-lg font-semibold mb-2">Haiku {ind + 1}</h2>
                                <p className="italic mb-1">{haiku.line1}</p>
                                <p className="italic mb-1">{haiku.line2}</p>
                                <p className="italic">{haiku.line3}</p>
                            </div>
                            <div className="p-4 flex justify-end">
                                <Link href={`/edit-haiku/${haiku._id.toString()}`}>
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
