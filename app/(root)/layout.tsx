import '../globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-jet-black text-cream">{children}</body>
    </html>
  );
}
