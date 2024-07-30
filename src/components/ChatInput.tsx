"use client"

import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { addMessage, showMessages } from "@/store";
import getResponse from "../api/getResponse";

interface ChatInputProps {
    setHistory: React.Dispatch<React.SetStateAction<any[]>>,
    isLoading?: boolean;
}

export default function ChatInput({ setHistory, isLoading }: ChatInputProps) {
    const [inputValue, setInputValue] = useState('');
    const [isLoadingInput, setIsLoading] = useState(isLoading);

    const handleSendMessage =  async () => {
        if (inputValue.trim() === "") return;
        else {
            addMessage({message: inputValue, isUser: true});
            setHistory(showMessages());
            setInputValue("");
            setIsLoading(true);
            try {
                const data = await getResponse(inputValue);
                addMessage({message: data, isUser: false});
                setHistory(showMessages());
            } catch (error) {
                console.error("Error getting response:", error);
                addMessage({message: "Error in getting response", isUser: false});
                setHistory(showMessages());
            } finally {
                setIsLoading(false);
            }
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
                onChange={(e) => setInputValue(e.target.value)  }
                onKeyDown={handleEnterDown}
                disabled={isLoadingInput}
                />
                <div className="absolute right-0 top-0 h-full w-10 flex items-center justify-center rounded-r-lg">
                    <button 
                        className="w-4 h-4 flex items-center justify-center" 
                        onClick={handleSendMessage}
                        disabled={isLoadingInput}
                    >
                        <FontAwesomeIcon icon={faPaperPlane} className={`text-white ${isLoading ? 'opacity-50' : ''}`} />
                    </button>
                </div>
            </div>
            {isLoadingInput && (
                <div className="ml-2 text-white flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Loading...
                </div>
            )}
        </div>
    );
}