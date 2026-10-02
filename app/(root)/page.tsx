import Link from 'next/link';

export default function RootPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-4 text-center">
      <div className="text-gold text-4xl" aria-hidden="true">◆</div>
      <h1 className="text-4xl font-black uppercase tracking-wider">Drive Pro</h1>
      <p className="text-cream/80">Choose a language · Выберите язык · Тілді таңдаңыз</p>
      <nav aria-label="Language / Язык / Тіл" className="flex flex-wrap justify-center gap-4">
        <Link href="/ru" className="action-outline">Русский</Link>
        <Link href="/kz" className="action-outline">Қазақша</Link>
        <Link href="/en" className="action-outline">English</Link>
      </nav>
    </main>
  );
}
