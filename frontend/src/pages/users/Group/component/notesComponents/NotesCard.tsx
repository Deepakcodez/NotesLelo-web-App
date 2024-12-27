import React, { useContext } from "react";
import { mutate } from "swr";
import axios from "axios";
import { motion } from "framer-motion";
import NoteCard from "@/Components/Card";
import { createGroupContext } from "@/Context";
import { useToken } from "@/hooks";
import handleDownload from "@/utils/handleDownload";

interface Note {
  _id: string;
  caption: string;
  description: string;
  pdf: { url: string };
  owner: string;
  likes: Array<{ _id: string }>;
  saved: Array<{ _id: string }>;
  createdAt: string;
}

interface NoteData {
  notes: Note;
  user: { name: string };
}

interface Props {
  data: NoteData[];
}

const NotesCard: React.FC<Props> = ({ data }) => {
  const { currentUser } = useContext(createGroupContext);
  const groupId = localStorage.getItem("groupId") || "";
  const { token } = useToken();

  const likeClickHandler = async (notesId: string) => {
    mutate<NoteData[]>(
      `https://notes-lelo-app-backend.vercel.app/api/v1/notes/groupNotes/${groupId}`,
      (currentData) =>
        currentData?.map((note) => {
          if (note.notes._id === notesId) {
            const isLiked = note.notes.likes.some(
              (user) => user._id === currentUser._id
            );
            const updatedLikes = isLiked
              ? note.notes.likes.filter((user) => user._id !== currentUser._id)
              : [...note.notes.likes, { _id: currentUser._id }];

            return { ...note, notes: { ...note.notes, likes: updatedLikes } };
          }
          return note;
        }),
      false
    );

    try {
      await axios.put(
        `https://notes-lelo-app-backend.vercel.app/api/v1/notes/groupNotes/addLike/${notesId}`,
        {},
        {
          headers: { "Content-Type": "application/json", token },
          withCredentials: true,
        }
      );
      mutate(
        `https://notes-lelo-app-backend.vercel.app/api/v1/notes/groupNotes/${groupId}`
      );
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const saveHandler = async (notesId: string) => {
    mutate<NoteData[]>(
      `https://notes-lelo-app-backend.vercel.app/api/v1/notes/groupNotes/${groupId}`,
      (currentData) =>
        currentData?.map((note) => {
          if (note.notes._id === notesId) {
            const isUserSaved = note.notes.saved.some(
              (user) => user._id === currentUser._id
            );
            const updatedSaved = isUserSaved
              ? note.notes.saved.filter(
                  (user) => user._id !== currentUser._id
                )
              : [...note.notes.saved, { _id: currentUser._id }];

            return { ...note, notes: { ...note.notes, saved: updatedSaved } };
          }
          return note;
        }),
      false
    );

    try {
      await axios.post(
        `https://notes-lelo-app-backend.vercel.app/api/v1/notes/groupNotes/saveNotes/${notesId}`,
        {},
        {
          headers: { "Content-Type": "application/json", token },
          withCredentials: true,
        }
      );
      mutate(
        `https://notes-lelo-app-backend.vercel.app/api/v1/notes/groupNotes/${groupId}`
      );
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <>
      {data?.map((noteData, index) => (
        <motion.div
          key={noteData.notes._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.3 }}
        >
          <NoteCard
            noteId={noteData.notes._id}
            caption={noteData.notes.caption}
            description={noteData.notes.description}
            pdfUrl={noteData.notes.pdf.url}
            owner={noteData.notes.owner}
            likes={noteData.notes.likes}
            saved={noteData.notes.saved}
            createdAt={noteData.notes.createdAt}
            currentUserId={currentUser._id}
            userName={noteData.user?.name || ""}
            onLike={likeClickHandler}
            onSave={saveHandler}
            onDownload={handleDownload}
          />
        </motion.div>
      ))}
    </>
  );
};

export default NotesCard;
