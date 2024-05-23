"use client"

import React, {useState} from "react";
import Conversation from "./Conversation";
import DefaultCards from "./DefaultCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faQ } from "@fortawesome/free-solid-svg-icons";

export default function ChatHistory(){
    const array_numbers = ["1", "2", "3", "4", "5"];

    const [history, hasHistory] = useState([]);
    return (
        <div className="overflow-y-auto flex-grow h-0">
            {history.length > 0 ? (
                history.map((message, index) => (
                    <Conversation key={index} message={message} isUser={false} />
                ))
            ) : (
                <div className="flex items-center justify-center h-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        <DefaultCards title="How do I load wallet?" icon={<FontAwesomeIcon icon={faWallet} className="text-lime-400"/>}/>
                        <DefaultCards title="How are you able to help me with my query?" icon={<FontAwesomeIcon icon={faQ} className="text-lime-400"/>}/>
                    </div>
                </div>
            )}
        </div>
    )
}