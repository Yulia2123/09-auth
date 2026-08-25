import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  sidebar: ReactNode;
};

export default function FilterLayout({ children, sidebar }: Props) {
  return (
    <div>
      <aside>{sidebar}</aside>
      <section>{children}</section>
    </div>
  );
}
