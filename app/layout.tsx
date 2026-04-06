import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

// Minimal root layout proxy.
// The actual <html>/<body> are rendered in app/[locale]/layout.tsx.
export default function RootLayout({ children }: Props) {
  return children;
}
