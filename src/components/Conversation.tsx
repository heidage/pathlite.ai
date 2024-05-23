import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faUser } from '@fortawesome/free-solid-svg-icons'
import React from "react";

type Props = {
    message: string;
    isUser: boolean;
    sources?: { name: string; link: string }[];
}

export default function Conversation({message, isUser, sources}: Props){
    return (
        <div className="border-b border-gray-700 w-11/12 mx-auto p-4 flex gap-3">
            <div className="flex-shrink-0">
                {isUser ? <FontAwesomeIcon icon={faUser} className="text-white text-xl" /> 
                : <FontAwesomeIcon icon={faRobot} className="text-white text-xl" />}
            </div>
            <div className="flex-grow">
                <div className="text-white">
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
        </div>
    );
}