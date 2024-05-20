import ChatInput from "@/components/ChatInput";
import Head from "next/head";

export default function ChatUI() {
  return (
      <div className="bg-gradient-to-r from-pink-700 to-yellow-400 h-screen">
        <div className="flex items-center justify-center h-full">
          <div className="container">
            <main>
              <ChatInput />
            </main>
          </div>
        </div>
      </div>
  );
}
