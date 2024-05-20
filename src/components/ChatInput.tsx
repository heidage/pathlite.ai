import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export default function ChatInput() {
    return (
        <div className="chat-input-container">
            <input 
                type="text" 
                placeholder="Ask pathlite.ai anything related to your document"
                className="flex-grow h-10 px-3 rounded-l-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500"
            />
            <button className="p-2 rounded-r-lg bg-blue-500 text-white">
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
        </div>
    );
}