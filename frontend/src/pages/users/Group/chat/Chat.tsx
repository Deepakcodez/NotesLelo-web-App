import { ChevronDown, ChevronUp } from "lucide-react"
import React from "react"

const Chat: React.FC = () => {
    const [isShowChatBox, setIsShowChatBox] = React.useState(false)
    const [bottomPosition, setBottomPosition] = React.useState(0)
    const chatBoxRef = React.useRef<HTMLDivElement>(null)

    // const handleDrag = (e: React.DragEvent) => {
    //     const newBottomPosition = Math.max(0, window.innerHeight - e.clientY - (chatBoxRef.current?.offsetHeight || 0))
    //     setBottomPosition(newBottomPosition)
    // }

    return (
        <div
            ref={chatBoxRef}
            className={`absolute z-50 bottom-${bottomPosition} right-12 md:w-[30%] w-[50%] rounded-t-lg bg-slate-800/60 border border-t-1 border-slate-200/20 ${isShowChatBox ? "h-[30rem]" : "h-[3rem]"}`}
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
                <h1 className="text-white text-xs text-center">Instant Chat</h1>
            </header>

            {/* chat content */}

        </div>
    )
}
export default Chat