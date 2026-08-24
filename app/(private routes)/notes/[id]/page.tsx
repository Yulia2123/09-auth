type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NotePage({ params }: Props) {
  const { id } = await params;

  return (
    <main>
      <h1>Note</h1>
      <p>Note ID: {id}</p>
    </main>
  );
}
