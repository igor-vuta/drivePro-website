import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import '../globals.css';

const seoTitle = 'Drive Pro — Аренда экскаватора в Алматы | Земляные работы';
const seoDescription = 'Аренда экскаватора с оператором в Алматы и Казахстане. Экскаваторы 1.5т, 2т, 4т, фронтальный погрузчик, трактор. Первый заказ 80 000 ₸. Тел: +7 777 207-16-97';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      'аренда экскаватора алматы',
      'земляные работы алматы',
      'экскаватор с оператором',
      'мини экскаватор аренда',
      'фронтальный погрузчик алматы',
      'Drive Pro',
    ],
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      locale: 'ru_KZ',
      type: 'website',
    },
  };
}

export function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'kz' }];
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const messages = await getMessages();

  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
}
