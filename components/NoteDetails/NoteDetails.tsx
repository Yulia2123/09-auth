"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api/clientApi";
import type { Note } from "@/types/note";

type NoteDetailsProps = {
  id: string;
};

export default function NoteDetails({ id }: NoteDetailsProps) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !note) {
    return <p>Failed to load note.</p>;
  }

  return (
    <article>
      <h1>{note.title}</h1>

      <p>{note.content}</p>

      <p>Tag: {note.tag}</p>

      <p>Created: {new Date(note.createdAt).toLocaleDateString()}</p>
    </article>
  );
}
