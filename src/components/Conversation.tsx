import React from "react";
import Message from "./Message";

type Message = {
    message: string;
    isUser: boolean;
    sources?: { name: string; link: string; website: boolean }[];
};

type Props = {
    messages: Message[],
}

export default function Conversation({messages}: Props){
    return (
        <div className="p-6">
            {
                messages.map((message, index)=>(
                    <Message
                        key={index}
                        message={message.message}
                        isUser={message.isUser}
                        sources={message.sources}
                    />
                ))
            }
        </div>
    );
}