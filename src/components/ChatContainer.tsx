import React, {useState} from "react";
import ChatInput from "./ChatInput";
import ChatHistory from "./ChatHistory";

type Message = {
    message: string;
    isUser: boolean;
    sources?: { name: string; link: string }[];
};

export default function ChatContainer() {
    const [history, setHistory] = useState<Message[]>([]);
    return (
        <>
            <ChatHistory history={history}/>
            <ChatInput setHistory={setHistory}/>
        </>
    )
}