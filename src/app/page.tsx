import ChatHistory from "@/components/ChatHistory";
import ChatInput from "@/components/ChatInput";

export default function ChatUI() {
  return (
    <div className="bg-gradient-to-r from-pink-700 to-yellow-400 h-screen">
      <div className="flex items-center justify-center h-full">
        <div className="container">
          <main>
            <div className="flex-grow">
              {/* Other components or content can go here */}
              <ChatHistory />
            </div>
            <ChatInput />
          </main>
        </div>
      </div>
    </div>
  );
}
