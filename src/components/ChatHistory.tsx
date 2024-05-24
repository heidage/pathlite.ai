"use client";

import React, { useState } from "react";
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

export default function ChatHistory() {
    const messages = [
        {
            message: "Hi, how can I help you?",
            isUser: false,
            sources: []
        },
        {
            message: "What is Mendable?",
            isUser: true,
            sources: []
        },
        {
            message: "With Mendable, you can build a LLM chatbot that understands your technical resources, like documentation, product manuals, and more. Then you can deploy it anywhere that your customers or employees need.\n\nTo get started, simply connect your data and watch the chatbot learn.",
            isUser: false,
            sources: [
                { name: "Website", link: "https://mendable.ai" },
                { name: "Documentation", link: "https://docs.mendable.ai" }
            ]
        }
    ];

    const [history, hasHistory] = useState<Message[]>(messages);
    return (
        <div className="overflow-y-auto flex-grow h-0">
            {history.length > 0 ? (
                <Conversation messages={history} />
            ) : (
                <div className="flex items-center justify-center h-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        <DefaultCards
                        title="How do I load wallet?"
                        icon={
                            <FontAwesomeIcon icon={faWallet} className="text-lime-400" />
                        }
                        />
                        <DefaultCards
                        title="How are you able to help me with my query?"
                        icon={<FontAwesomeIcon icon={faQ} className="text-lime-400" />}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
