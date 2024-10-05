import { addDisLikeToDemand, addLikeToDemand } from "@/services";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface LikeDislikeButonsProps {
  dmd: any;
}

const LikeDislikeButons: React.FC<LikeDislikeButonsProps> = ({ dmd }) => {
  // Local state for instant feedback
  const [likeCount, setLikeCount] = useState<number>(dmd?.demand.like.length);
  const [dislikeCount, setDislikeCount] = useState<number>(dmd?.demand.dislike.length);
  const [liked, setLiked] = useState<boolean>(
    dmd?.demand.like.includes(dmd.user._id)
  );
  const [disliked, setDisliked] = useState<boolean>(
    dmd?.demand.dislike.includes(dmd.user._id)
  );

  const handleLike = async () => {
    // Save previous state for reversion in case of error
    const prevLikeCount = likeCount;
    const prevDislikeCount = dislikeCount;
    const prevLiked = liked;
    const prevDisliked = disliked;

    // Update the UI instantly
    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
      if (disliked) {
        setDislikeCount((prev) => prev - 1);
      }
    }
    setLiked(!liked);
    setDisliked(false);

    try {
      // Send request to server
      await addLikeToDemand(dmd?.demand._id);
    } catch (err) {
      console.error("Error liking the demand:", err);
      toast.error("Something went wrong");
      // Revert to previous state in case of error
      setLikeCount(prevLikeCount);
      setDislikeCount(prevDislikeCount);
      setLiked(prevLiked);
      setDisliked(prevDisliked);
    }
  };

  const handleDislike = async () => {
    // Save previous state for reversion in case of error
    const prevLikeCount = likeCount;
    const prevDislikeCount = dislikeCount;
    const prevLiked = liked;
    const prevDisliked = disliked;

    // Update the UI instantly
    if (disliked) {
      setDislikeCount((prev) => prev - 1);
    } else {
      setDislikeCount((prev) => prev + 1);
      if (liked) {
        setLikeCount((prev) => prev - 1);
      }
    }
    setDisliked(!disliked);
    setLiked(false);

    try {
      // Send request to server
      await addDisLikeToDemand(dmd?.demand._id);
    } catch (err) {
      console.error("Error disliking the demand:", err);
      toast.error("Something went wrong");
      // Revert to previous state in case of error
      setLikeCount(prevLikeCount);
      setDislikeCount(prevDislikeCount);
      setLiked(prevLiked);
      setDisliked(prevDisliked);
    }
  };

  return (
    <div className="flex gap-4">
      <div className="flex items-center">
        {liked ? (
          <ArrowBigUp
            strokeWidth={1}
            color="white"
            fill="white"
            onClick={handleLike}
          />
        ) : (
          <ArrowBigUp strokeWidth={1} color="white" onClick={handleLike} />
        )}
        <p className="text-white/50 text-xs">
          {likeCount > 0 ? likeCount : ""}
        </p>
      </div>
      <div className="flex items-center">
        {disliked ? (
          <ArrowBigDown
            strokeWidth={1}
            fill="white"
            color="white"
            onClick={handleDislike}
          />
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

export default LikeDislikeButons;
