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
  const [localLiked, setLocalLiked] = useState<string[]>(dmd?.demand.like || []);
  const [localDisliked, setLocalDisliked] = useState<string[]>(dmd?.demand.dislike || []);

  const { userDetail } = useAuth();

  useEffect(() => {
    if (dmd?.demand) {
      setLiked(dmd?.demand.like.includes(userDetail?._id));
      setDisliked(dmd?.demand.dislike.includes(userDetail?._id));

      setLocalDisliked(dmd?.demand.dislike || []);
      setLocalLiked(dmd?.demand.like || []);
    }
  }, [dmd, userDetail,]);

  const handleLike = async () => {
    const userId = userDetail?._id;
    if (!userId) return;
    try {
      if (liked) {
        setLiked(false);
        setLocalLiked((prev) => prev.filter((id) => id !== userId));
        try {
          await addLikeToDemand(dmd?.demand._id);

        } catch (error) {
          setLiked(true);
          setLocalLiked((prev) => [...prev, userId]);
        }
      } else {
        setLiked(true);
        setLocalLiked((prev) => [...prev, userId]);
        const disliked = localDisliked.includes(userId);
        disliked && setLocalDisliked((prev) => prev.filter((id) => id !== userId));
        disliked && setDisliked(false);
        try {
          await addLikeToDemand(dmd?.demand._id);

        } catch (error) {
          setLiked(false)
          setLocalLiked((prev) => prev.filter((id) => id !== userId));
          disliked && setLocalDisliked((prev) => [...prev, userId]);
          disliked && setDisliked(false);

        }
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleDislike = async () => {
    const userId = userDetail?._id;
    if (!userId) return;

    try {
      if (disliked) {
        setDisliked(false);
        setLocalDisliked((prev) => prev.filter((id) => id !== userId));

        try {
          await addDisLikeToDemand(dmd?.demand._id);

        } catch (error) {
          setDisliked(true);
          setLocalDisliked((prev) => [...prev, userId]);

        }
      } else {
        setDisliked(true);
        setLocalDisliked((prev) => [...prev, userId]);
        const liked = localLiked.includes(userId);
        liked && setLocalLiked((prev) => prev.filter((id) => id !== userId));
        liked && setLiked(false);

        try {
          await addDisLikeToDemand(dmd?.demand._id);

        } catch (error) {
          setDisliked(false);
          setLocalDisliked((prev) => prev.filter((id) => id !== userId));
          liked && setLocalLiked((prev) => [...prev, userId]);
          liked && setLiked(true);

        }
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
        <p className="text-white/50 text-xs">{localLiked?.length > 0 ? localLiked?.length : ""}</p>
      </div>
      <div className="flex items-center">
        {disliked ? (
          <ArrowBigDown strokeWidth={1} fill="white" color="white" onClick={handleDislike} />
        ) : (
          <ArrowBigDown strokeWidth={1} color="white" onClick={handleDislike} />
        )}
        <p className="text-white/50 text-xs">{localDisliked?.length > 0 ? localDisliked?.length : ""}</p>
      </div>
    </div>
  );
};

export default LikeDislikeButtons;
