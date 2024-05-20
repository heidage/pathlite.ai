import React from "react";
import UserTemplate from "./UserTemplate";

export default function ChatHistory(){
    const array_numbers = [1, 2, 3, 4, 5];
    return (
        <div>
            {array_numbers.map((number) => (
                <div key={number}>
                    <div>
                        <UserTemplate />
                    </div>
                </div>
            ))}
        </div>
    )
}