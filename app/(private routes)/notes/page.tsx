import type { Metadata } from "next";

import { fetchNotes } from "@/lib/api/serverApi";
import NoteList from "@/components/NoteList/NoteList";

export const metadata: Metadata = {
  title: "Notes | NoteHub",
  description: "Manage your notes in NoteHub",
};

export default async function NotesPage() {
  const notes = await fetchNotes();

  return (
    <main>
      <h1>Notes</h1>
      <NoteList notes={notes} />
    </main>
  );
}
