import { addDisLikeToDemand, addLikeToDemand } from "@/services"
import { ArrowBigDown, ArrowBigUp } from "lucide-react"
import React from "react"

interface LikeDislikeButonsProps {
    dmd: any
}
const LikeDislikeButons: React.FC<LikeDislikeButonsProps> = ({ dmd }) => {
    return (
        <div className="flex gap-4">
            <div className="flex items-center">
                {
                    dmd?.demand.like.find((like: any) => like === dmd.user._id) ?
                        <ArrowBigUp strokeWidth={1} color="white" fill="white" onClick={() => addLikeToDemand(dmd?.demand._id)} />
                        :
                        <ArrowBigUp strokeWidth={1} color="white" onClick={() => addLikeToDemand(dmd?.demand._id)} />
                }
                <p className="text-white/50 text-xs">{dmd?.demand.like.length > 0 ? dmd.demand.like.length : ""}</p>
            </div>
            <div className="flex items-center">
                {

                    dmd.demand.dislike.find((dislike: any) => dislike === dmd.user._id) ?
                        <ArrowBigDown strokeWidth={1} fill="white" color="white" onClick={() => addDisLikeToDemand(dmd?.demand._id)} /> :
                        <ArrowBigDown strokeWidth={1} color="white" onClick={() => addDisLikeToDemand(dmd?.demand._id)} />
                }
                <p className="text-white/50 text-xs">{dmd?.demand.dislike.length > 0 ? dmd.demand.dislike.length : ""}</p>
            </div>
        </div>
    )
}
export default LikeDislikeButons