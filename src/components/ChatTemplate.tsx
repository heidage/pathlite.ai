import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons'
import React from "react";

type Props = {
    message: string;
    isUser: boolean;
}

export default function ChatTemplate({message, isUser}: Props){
    return (
        <div className="border-b border-gray-600 w-11/12 mx-auto">
            <div>
                <FontAwesomeIcon icon={faUser} className="text-white" />
            </div>
            <div>
                {/** User message */}
                {/** Bot message */}
            </div>
        </div>
    );
}