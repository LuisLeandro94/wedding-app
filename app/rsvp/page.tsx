'use client'
import React, { useEffect, useState } from 'react';

const RSVPPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ name, email, message });
    };

    useEffect(() => {
        const user = localStorage.getItem('guestName');

        if (user)
            setName(user);
    }, [])

    return (
        <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-center">
                <div>
                    {/* <h1 className='font-(family-name:--font-amsterdam-four) text-4xl leading-30 '>Juntem-se a nós no</h1>
                <h1 className='font-(family-name:--font-amsterdam-four) text-7xl text-(--accent)'>Nosso Casamento</h1> */}
                    <h1 className='font-(family-name:--font-amsterdam-four) text-4xl leading-30 '>{name}, juntas-te a nós no</h1>
                    <h1 className='font-(family-name:--font-amsterdam-four) text-7xl text-(--accent)'>Nosso Casamento?</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                    </div>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
};

export default RSVPPage;