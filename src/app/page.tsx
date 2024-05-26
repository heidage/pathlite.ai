import ChatHistory from "@/components/ChatHistory";
import ChatInput from "@/components/ChatInput";
import { Provider } from "jotai";
import { store } from "@/store";
export default function ChatUI() {
  return (
    <div className="bg-gradient-to-r from-pink-700 to-yellow-400 h-screen">
      <div className="flex items-center justify-center h-full">
        <div className="container">
          <main>
            <div className="flex flex-col">
              {/* Other components or content can go here */}
              <Provider store={store}>
                <ChatHistory />
                <ChatInput />
              </Provider>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
