import React, {useEffect, useState} from "react";
import ChatInput from "./ChatInput";
import ChatHistory from "./ChatHistory";
import { useLiveQuery } from "dexie-react-hooks";
import { getAllMessagesFromDB } from "../../db/db.model";

type Message = {
    message: string;
    isUser: boolean;
    sources?: { name: string; link: string }[];
};

export default function ChatContainer() {
    const messageList = useLiveQuery(() => getAllMessagesFromDB());
    const [history, setHistory] = useState<Message[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (messageList) {
            setHistory(messageList);
        }
    }, [messageList])
    
    return (
        <>
            <ChatHistory history={history} setHistory={setHistory}/>
            <ChatInput setHistory={setHistory} isLoading={isLoading}/>
        </>
    )
}