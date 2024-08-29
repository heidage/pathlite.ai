"use client";

import React, { useState, useEffect,useMemo } from "react";
import Conversation from "./Conversation";

type Message = {
    message: string;
    isUser: boolean;
    sources?: { name: string; link: string; website: boolean }[];
};

type Props = {
    history: Message[],
    setHistory: React.Dispatch<React.SetStateAction<any[]>>,
}

export default function ChatHistory({history, setHistory}: Props) {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => setIsLoaded(true),1000);
    }, []);

    return (
        <div className="scrollbar-custom flex-grow h-0">
            {history.length > 0 ? (
                <Conversation messages={history}/>
            ) : (
                <div className={`flex flex-col items-center justify-center h-full transition-all duration-500 ${isLoaded ? 'transform -translate-y-1/4' : ''}`}>
                    <div className="mb-6 text-center">
                        <h1 className="text-3xl font-bold text-white">Welcome to Pathlite.ai</h1>
                        <p className="text-white mt-2">Your AI Technical Assistant</p>
                    </div>
                </div>
            )}
        </div>
    );
}
