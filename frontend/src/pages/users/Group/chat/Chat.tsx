import { useAuth } from "@/hooks"
import { useSocket } from "@/utils/socketProvider"
import { ChevronDown, ChevronUp } from "lucide-react"
import React, { useEffect } from "react"

const Chat: React.FC = () => {
    const [isShowChatBox, setIsShowChatBox] = React.useState(false)
    const [bottomPosition, setBottomPosition] = React.useState(0)
    const { userDetail } = useAuth()
    const groupId = localStorage.getItem("groupId");
    const [yourMessage, setYourMessage] = React.useState("")
    const [messages, setMessages] = React.useState<{ sender: string; message: string }[]>(JSON.parse(localStorage.getItem("chatMessages") || "[]"))
    const chatBoxRef = React.useRef<HTMLDivElement>(null)
    const socket = useSocket()

    useEffect(() => {
        if (!userDetail) return;
        socket.emit("join:room", { roomId: groupId, userEmail: userDetail?.email })
        socket.on("newUser:joined", ({ roomId, userEmail }) => {
            console.log("new user", userEmail, "just joined : ", roomId)
        })
        socket.on("joined:room", ({ roomId, userEmail }) => {
            console.log("you", userEmail, "just joined : ", roomId)
        })

        socket.on("receive:message", ({ sender, message }) => {
            const newMessage = { sender, message };
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, newMessage];
                localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
                return updatedMessages;
            });
        });

        return () => {
            socket.off("newUser:joined");
            socket.off("joined:room");
            socket.off("receive:message");
        };

    }, [userDetail, socket, groupId])

    const sendMessage = () => {
        if (!yourMessage.trim() || !userDetail) return;

        const newMessage = { sender: userDetail.email, message: yourMessage };
        setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages, newMessage];
            localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
            return updatedMessages;
        });

        socket.emit("send:message", { roomId: groupId, ...newMessage });
        setYourMessage("");
    };

    return (
        <div
            ref={chatBoxRef}
            className={`absolute z-50 bottom-${bottomPosition} right-12 w-[90%] md:w-[30%] rounded-lg bg-slate-800/70 border border-t-1 border-slate-200/20 shadow-lg transition-all duration-300 ${isShowChatBox ? "h-[30rem]" : "h-[4rem]"}`}
        >
            <header
                draggable
                onClick={() => setIsShowChatBox(!isShowChatBox)}
                className="flex items-center justify-between bg-slate-600/60 border-b border-slate-200/30 p-3 cursor-pointer"
            >
                <h1 className="text-white text-lg">Instant Chat</h1>
                {
                    isShowChatBox ? 
                        <ChevronUp color="white" /> : 
                        <ChevronDown color="white" />
                }
            </header>

            {/* Chat content */}
            {isShowChatBox && (
                <div className="flex-1 overflow-y-auto p-3 no-scrollbar">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-3 rounded-md my-2 ${msg.sender === userDetail?.email ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"}`}
                        >
                            <strong>{msg.sender === userDetail?.email ? "You" : msg.sender}:</strong> {msg.message}
                        </div>
                    ))}
                </div>
            )}

            {isShowChatBox && (
                <div className="flex items-center p-3 bg-slate-700/40 border-t border-slate-200/30">
                    <input
                        value={yourMessage}
                        onChange={(e) => setYourMessage(e.target.value)}
                        placeholder="Enter Message"
                        className="flex-1 px-4 py-2 rounded-md bg-slate-600 text-white border border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        onClick={sendMessage} 
                        className="ml-3 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Send
                    </button>
                </div>
            )}
        </div>
    );
}

export default Chat;
