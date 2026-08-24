import Link from "next/link";

export default function NotesPage() {
  return (
    <main>
      <h1>Notes</h1>

      <p>Here you can manage your notes.</p>

      <Link href="/profile">Go to profile</Link>
    </main>
  );
}
