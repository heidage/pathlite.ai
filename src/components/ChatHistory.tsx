"use client";

import React, { useState, useEffect,useMemo } from "react";
import Conversation from "./Conversation";
import DefaultCards from "./DefaultCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faQ } from "@fortawesome/free-solid-svg-icons";

type Message = {
    message: string;
    isUser: boolean;
    sources?: { name: string; link: string }[];
};

type Props = {
    history: Message[],
    setHistory: React.Dispatch<React.SetStateAction<any[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ChatHistory({history, setHistory, setLoading}: Props) {
    return (
        <div className="scrollbar-custom flex-grow h-0">
            {history.length > 0 ? (
                <Conversation messages={history}/>
            ) : (
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="mb-6 text-center">
                        <h1 className="text-3xl font-bold text-lime-400">Welcome to Pathlite.ai</h1>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        <DefaultCards
                        title="How do I load wallet?"
                        icon={
                            <FontAwesomeIcon icon={faWallet} className="text-lime-400" />
                        }
                        setHistory={setHistory}
                        setLoading={setLoading}
                        />
                        <DefaultCards
                        title="How are you able to help me with my query?"
                        icon={<FontAwesomeIcon icon={faQ} className="text-lime-400" />}
                        setHistory={setHistory}
                        setLoading={setLoading}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
