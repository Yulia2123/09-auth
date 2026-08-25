import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api/serverApi";
import NoteDetails from "@/components/NoteDetails/NoteDetails";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NotePage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetails id={id} />
      </HydrationBoundary>
    </main>
  );
}
