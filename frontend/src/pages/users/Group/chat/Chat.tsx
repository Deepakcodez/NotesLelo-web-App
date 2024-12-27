import { useAuth } from "@/hooks"
import { useSocket } from "@/utils/socketProvider"
import { ChevronDown, ChevronUp } from "lucide-react"
import React, { useEffect } from "react"



const Chat: React.FC = () => {
    const [isShowChatBox, setIsShowChatBox] = React.useState(false)
    const [bottomPosition, setBottomPosition] = React.useState(0)
    const { userDetail, isLoading, isError } = useAuth()
    const groupId = localStorage.getItem("groupId");
    const [yourMessage, setYourMessage] = React.useState("")
    const [messages, setMessages] = React.useState<{ sender: string; message: string }[]>(
        JSON.parse(localStorage.getItem("chatMessages") || "[]")
    );
    const chatBoxRef = React.useRef<HTMLDivElement>(null)
    const socket = useSocket()

    // const handleDrag = (e: React.DragEvent) => {
    //     const newBottomPosition = Math.max(0, window.innerHeight - e.clientY - (chatBoxRef.current?.offsetHeight || 0))
    //     setBottomPosition(newBottomPosition)
    // }




    useEffect(() => {
        if (!userDetail) return;
        socket.emit("join:room", { roomId: groupId, userEmail: userDetail?.email })
        socket.on("newUser:joined", ({ roomId, userEmail }) => {
            console.log("new user", userEmail, "just joined : ", roomId)
        })
        socket.on("joined:room", ({ roomId, userEmail }) => {
            console.log("you", userEmail, "just joined : ", roomId)
        })

        // Listen for incoming messages
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

    // Send a message
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
            className={`absolute z-50 bottom-${bottomPosition} right-12 md:w-[30%] w-[50%] rounded-t-lg bg-slate-800/60 border border-t-1 border-slate-200/20 ${isShowChatBox ? "h-[30rem]" : "h-[3rem]"} flex flex-col`}
        >
            <header
                draggable
                // onDrag={handleDrag}
                onClick={() => setIsShowChatBox(!isShowChatBox)}
                className="flex flex-col items-center justify-center bg-slate-600/40 border-b border-slate-200/20 border-b-1 pb-2"
            >
                {
                    isShowChatBox ?
                        <ChevronUp color="white" /> :
                        <ChevronDown color="white" />
                }
                <h1 className="text-white text-xs text-center ">Instant Chat</h1>
            </header>

            {/* chat content */}

            {isShowChatBox && (
                <div className="flex-1 overflow-y-auto p-2 no-scrollbar">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-2 rounded-md my-1  ${msg.sender === userDetail?.email ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
                                }`}
                        >
                            <strong>{msg.sender === userDetail?.email ? "You" : msg.sender}:</strong> {msg.message}
                        </div>
                    ))}
                </div>
            )}

            {isShowChatBox && (
                <div className="flex w-full items-center p-2">
                    <input
                        value={yourMessage}
                        onChange={(e) => setYourMessage(e.target.value)}
                        placeholder="Enter Message"
                        className="flex-1 px-2 border border-slate-400 rounded-md"
                    />
                    <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded-md ml-2">
                        Send
                    </button>
                </div>
            )}


        </div>
    )
}
export default Chat