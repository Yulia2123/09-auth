"use client";

type Props = {
  slug: string[];
};

export default function Notes({ slug }: Props) {
  return (
    <div>
      <h1>Notes</h1>
      <p>Filter: {slug.join("/")}</p>
    </div>
  );
}
