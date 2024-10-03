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
                        <div key={ind} className="card w-full bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title text-lg font-semibold">Haiku {ind + 1}</h2>
                                <div>
                                    <CldImage
                                        width='960'
                                        height='600'
                                        src={haiku.photo}
                                        sizes="100vw"
                                        alt={`Haiku ${ind + 1}`}
                                    />
                                </div>
                                <div className="text-sm text-white">
                                    <p className="italic">{haiku.line1}</p>
                                    <p className="italic">{haiku.line2}</p>
                                    <p className="italic">{haiku.line3}</p>
                                </div>
                                <div className="card-actions justify-end mt-4">
                                    <Link href={`/edit-haiku/${haiku._id.toString()}`}>
                                        <button className="btn btn-sm btn-primary">Edit</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
