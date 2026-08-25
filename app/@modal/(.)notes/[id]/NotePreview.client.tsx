"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { fetchNoteById } from "@/lib/api/clientApi";
import Modal from "@/components/Modal/Modal";

type Props = {
  id: string;
};

export default function NotePreview({ id }: Props) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <p>Loading...</p>
      </Modal>
    );
  }

  if (isError || !note) {
    return (
      <Modal onClose={handleClose}>
        <p>Failed to load note.</p>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <article>
        <h2>{note.title}</h2>

        <p>{note.content}</p>

        <p>Tag: {note.tag}</p>

        <p>Created: {new Date(note.createdAt).toLocaleDateString()}</p>
      </article>
    </Modal>
  );
}
