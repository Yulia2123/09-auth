type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function FilterPage({ params }: Props) {
  const { slug } = await params;

  return (
    <main>
      <h1>Notes filter</h1>
      <p>Filter: {slug.join("/")}</p>
    </main>
  );
}
