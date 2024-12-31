import { useAuth } from "@/hooks";
import { useSocket } from "@/utils/socketProvider";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import moment from "moment";

const Chat: React.FC = () => {
  const [isShowChatBox, setIsShowChatBox] = React.useState(false);
  const { userDetail, isLoading, isError } = useAuth();
  const groupId = localStorage.getItem("groupId");
  const [yourMessage, setYourMessage] = React.useState("");
  const [messages, setMessages] = React.useState<
    {
      message: string;
      senderName: string;
      senderEmail: string;
      createdAt: string;
      id: any;
    }[]
  >([]);
  const chatBoxRef = React.useRef<HTMLDivElement>(null);
  const base_url = import.meta.env.VITE_BASE_URL as string;
  const socket = useSocket();
  const token = localStorage.getItem("useDataToken") || "";
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!userDetail) return;
    socket.emit("join:room", { roomId: groupId, userEmail: userDetail?.email });
    socket.on("newUser:joined", ({ roomId, userEmail }) => {
      console.log("new user", userEmail, "just joined : ", roomId);
    });
    socket.on("joined:room", ({ roomId, userEmail }) => {
      console.log("you", userEmail, "just joined : ", roomId);
    });

    // Listen for incoming messages
    socket.on(
      "receive:message",
      async ({ id, senderName, senderEmail, senderId, message }) => {
        setMessages((prevMessages) => {
          const isDuplicate = prevMessages.some((msg) => msg.id === id);
          if (isDuplicate) return prevMessages;

          return [...prevMessages, { id, senderName, senderEmail, message }];
        });

        console.log(">>>>>>>>>>>", senderId, message, senderName);
      }
    );

    return () => {
      socket.off("newUser:joined");
      socket.off("joined:room");
      socket.off("receive:message");
    };
  }, [userDetail, socket, groupId]);

  const handleAIProcessing = async () => {
    try {
      const messageToAi = yourMessage.replace("@ai", "");
      setYourMessage("");
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${
          import.meta.env.VITE_GEMINI_KEY
        }`,
        {
          contents: [
            {
              parts: [
                {
                  text: `you are a  brilliant teacher and you know everything each and every subject your task is to guide the student your task: ${messageToAi} write in short and simple language so that the student can understand easily`,
                },
              ],
            },
          ],
        }
      );
      const aiMessage =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry I'm bussy text you later!";
      console.log(">>>>>>>>>>>ai reply", aiMessage);

      const uniqueId = Date.now();
      const newMessage = {
        id: uniqueId,
        senderName: "@ai",
        senderId: "67706ce65b920d5d542bdcad",
        senderEmail: "noteslelo@ai.in",
        message: aiMessage,
      };

      // Update the state optimistically
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      socket.emit("send:message", { roomId: groupId, ...newMessage });
    } catch (error) {
      console.error("Error generating reply:", error);
      toast.error("AI failed to answer");
    }
  };

  // Send a message
  const sendMessage = () => {
    if (!yourMessage.trim() || !userDetail) return;
    const isAICommand = yourMessage.startsWith("@ai ");

    const uniqueId = Date.now();
    const createdAt = new Date().toISOString();
    const newMessage = {
      id: uniqueId,
      senderName: userDetail.name,
      senderId: userDetail._id,
      senderEmail: userDetail.email,
      message: yourMessage,
      createdAt,
    };

    // Update the state optimistically
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    socket.emit("send:message", { roomId: groupId, ...newMessage });

    if (isAICommand) {
      handleAIProcessing();
    } else {
      setYourMessage("");
    }
  };

  const getMessages = async () => {
    try {
      const resp = await axios.get(
        `${base_url}/api/v1/chat/getMessages/${groupId}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
            withCredentials: true,
          },
        }
      );

      const formattedMessages = resp.data.map((msg: any) => ({
        message: msg.message,
        senderName: msg.from.name,
        senderEmail: msg.from.email,
        createdAt: msg.createdAt,
      }));
      setMessages(formattedMessages);
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  useEffect(() => {
    getMessages();
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [messages, isShowChatBox]);
  return (
    <div
      ref={chatBoxRef}
      className={`absolute z-50 bottom-0 md:right-12 md:w-[30%] w-[100%] rounded-t-lg bg-slate-800/60 border border-t-1 border-slate-200/20 ${
        isShowChatBox ? "h-[70vh]" : "h-[3rem]"
      } flex flex-col`}
    >
      <header
        draggable
        onClick={() => setIsShowChatBox(!isShowChatBox)}
        className="flex items-center justify-between bg-slate-600/60 border-b border-slate-200/30 p-3 cursor-pointer"
      >
        <h1 className="text-white text-lg">Instant Chat</h1>
        {isShowChatBox ? (
          <ChevronUp color="white" />
        ) : (
          <ChevronDown color="white" />
        )}
      </header>

      {/* Chat content */}
      {isShowChatBox && (
        <div className="flex-1 overflow-y-auto p-3 no-scrollbar">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`bg-slate-600 text-black p-2 mb-2  rounded-md ${
                userDetail?.email === msg.senderEmail
                  ? "bg-slate-700 text-white self-end ms-3 "
                  : "self-start me-3"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="font-semibold text-sm leading-none text-white">
                    {msg.senderName.charAt(0).toUpperCase() +
                      msg.senderName.slice(1)}
                  </h1>
                  <h1 className="text-[.6rem] text-gray-300 leading-1">
                    {msg.senderEmail}
                  </h1>
                </div>
                <h1 className="text-[.6rem] text-gray-300 leading-1">
                  {moment(msg.createdAt).format("h:mm A")}
                </h1>
              </div>

              <div className="font-semibold ps-3 pb-2 text-white">
                {msg.message}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
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
};

export default Chat;
