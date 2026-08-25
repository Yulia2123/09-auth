import { fetchNotes } from "@/lib/api/serverApi";
import NoteList from "@/components/NoteList/NoteList";

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function FilterPage({ params }: Props) {
  const { slug } = await params;

  const tag = slug[0];

  const notes = await fetchNotes(undefined, 1, tag);

  return (
    <main>
      <h1>Notes filter</h1>

      <p>Filter: {tag}</p>

      <NoteList notes={notes} />
    </main>
  );
}
