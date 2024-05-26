"use client"

import React, {useState, useEffect} from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { addMessage,store,messagesAtom } from "@/store";

export default function ChatInput() {
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = () => {
        if (inputValue.trim() === "") return;
        else {
            addMessage({message: inputValue, isUser: "user"});
            console.log(store.get(messagesAtom));
            setInputValue('');
        }
    }
    const handleEnterDown = (event: { key: string; }) => {
        if (event.key==="Enter") {
            handleSendMessage();
        }
    }
    return (
        <div className="chat-input-container flex items-center">
            <div className="relative flex flex-grow">
                <input 
                type="text" 
                placeholder="Ask pathlite.ai anything related to your document"
                className="flex-grow h-14 pl-3 pr-10 rounded-2xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleEnterDown}
                />
                <div className="absolute right-0 top-0 h-full w-10 flex items-center justify-center rounded-r-lg">
                    <button className="w-4 h-4 flex items-center justify-center" onClick={handleSendMessage}>
                        <FontAwesomeIcon icon={faPaperPlane} className="text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}