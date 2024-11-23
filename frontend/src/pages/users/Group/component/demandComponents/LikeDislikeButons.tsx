import { useAuth } from "@/hooks";
import { addDisLikeToDemand, addLikeToDemand } from "@/services";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface LikeDislikeButtonsProps {
  dmd: any;
}

const LikeDislikeButtons: React.FC<LikeDislikeButtonsProps> = ({ dmd }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [disliked, setDisliked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(dmd?.demand.like.length || 0);
  const [dislikeCount, setDislikeCount] = useState<number>(dmd?.demand.dislike.length || 0);
  const { userDetail } = useAuth()

  useEffect(() => {
    if (dmd?.demand) {
      setLiked(dmd?.demand.like.includes(userDetail?._id));
      setDisliked(dmd?.demand.dislike.includes(userDetail?._id));
      setLikeCount(dmd?.demand.like.length || 0);
      setDislikeCount(dmd?.demand.dislike.length || 0);
    }
  }, [dmd, userDetail, liked, disliked])

  const handleLike = async () => {
    try {
      if (liked) {
        // User is unliking
        await addDisLikeToDemand(dmd?.demand._id); // Send request to remove like
        setLikeCount((prevCount) => prevCount - 1);
      } else {
        // User is liking
        await addLikeToDemand(dmd?.demand._id); // Send request to add like
        setLikeCount((prevCount) => prevCount + 1);
      }
      setLiked(!liked); // Toggle liked state
      if (disliked) {
        // If currently disliked, remove dislike
        setDisliked(false);
        setDislikeCount((prevCount) => prevCount - 1);
      }
    } catch (err) {
      console.error("Error liking the demand:", err);
      toast.error("Something went wrong");
    }
  };

  const handleDislike = async () => {
    try {
      if (disliked) {
        // User is un-disliking
        await addDisLikeToDemand(dmd?.demand._id); // Send request to remove dislike
        setDislikeCount((prevCount) => prevCount - 1);
      } else {
        // User is disliking
        await addDisLikeToDemand(dmd?.demand._id); // Send request to add dislike
        setDislikeCount((prevCount) => prevCount + 1);
      }
      setDisliked(!disliked); // Toggle disliked state
      if (liked) {
        // If currently liked, remove like
        setLiked(false);
        setLikeCount((prevCount) => prevCount - 1);
      }
    } catch (err) {
      console.error("Error disliking the demand:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex gap-4">
      <div className="flex items-center">
        {liked ? (
          <ArrowBigUp strokeWidth={1} color="white" fill="white" onClick={handleLike} />
        ) : (
          <ArrowBigUp strokeWidth={1} color="white" onClick={handleLike} />
        )}
        <p className="text-white/50 text-xs">
          {likeCount > 0 ? likeCount : ""}
        </p>
      </div>
      <div className="flex items-center">
        {disliked ? (
          <ArrowBigDown strokeWidth={1} fill="white" color="white" onClick={handleDislike} />
        ) : (
          <ArrowBigDown strokeWidth={1} color="white" onClick={handleDislike} />
        )}
        <p className="text-white/50 text-xs">
          {dislikeCount > 0 ? dislikeCount : ""}
        </p>
      </div>
    </div>
  );
};

export default LikeDislikeButtons;
