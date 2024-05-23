import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faUser } from '@fortawesome/free-solid-svg-icons'
import React from "react";

type Props = {
    message: string;
    isUser: boolean;
}

export default function Conversation({message, isUser}: Props){
    return (
        <div className="border-b border-gray-700 w-11/12 mx-auto">
            <div>
                {isUser ? <FontAwesomeIcon icon={faUser} className="text-white" /> 
                : <FontAwesomeIcon icon={faRobot} className="text-white" />}
            </div>
            <div>
                {/** User message */}
                {/** Bot message */}
            </div>
        </div>
    );
}