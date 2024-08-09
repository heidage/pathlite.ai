import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type FileContentModalProps = {
    source: { name: string; content: string };
    onClose: () => void;
}

export default function FileContentModal({ source, onClose }: FileContentModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
            <div className="bg-gray-800 rounded-lg p-6 w-3/4 max-h-3/4 overflow-auto relative z-10">
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 text-white hover:text-gray-300"
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h2 className="text-white text-lg font-bold mb-4">{source.name}</h2>
                <pre className="text-white whitespace-pre-wrap">{source.content}</pre>
            </div>
        </div>
    )
}