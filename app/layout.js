import "./globals.css";

export const metadata = {
  title: "Alsje Lourens | CV & Portfolio",
  description: "Alsje Lourens | Curriculum Vitae / Resume / Portfolio",
  icons: {
    icon: "/assets/fav.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
