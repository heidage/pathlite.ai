import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import React from "react";

type Props = {
    message: string;
    isUser: boolean;
    sources?: { name: string; link: string }[];
};

export default function Message({message, isUser, sources}: Props) {
    return (
    <div className="border-b border-gray-700 w-11/12 mx-auto p-4 flex gap-3">
        <div className="flex-shrink-0">
            {
                isUser ? (
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-900 border border-gray-700 rounded-md">
                        <FontAwesomeIcon icon={faUser} className="text-white" />
                    </div>
                ) 
                : <Image 
                    src={require('../../public/images/Pathlite.ai Brand Mark.png')} 
                    alt="robot" 
                    width={30} 
                    height={30} 
                    className="rounded-full border-2 border-gray-500"
                    />
            }
        </div>
        <div className="flex-grow">
            <div className="text-white" style={{ whiteSpace: 'pre-wrap' }}>
                {message}
            </div>
            {sources && sources.length > 0 && (
                <div className="mt-2">
                    <div className="text-gray-400 text-sm">Sources:</div>
                    <ul className="mt-1 space-y-1">
                        {sources.map((source, index)=>(
                            <li key={index}>
                                <a href={source.link} className="text-blue-400 hover:underline">{source.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    </div>)
}