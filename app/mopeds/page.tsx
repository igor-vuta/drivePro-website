import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import MopedExperience from '@/components/MopedExperience';
import messages from '@/messages/ru.json';
import { pageMetadata } from '@/lib/site';

export async function generateMetadata() {
  return pageMetadata('ru', 'mopeds');
}

export default function MopedsPage() {
  setRequestLocale('ru');
  return <NextIntlClientProvider locale="ru" messages={messages}>
    <MopedExperience phoneNumber={process.env.NEXT_PUBLIC_PHONE_NUMBER || '+7 (777) 207-16-97'} whatsappNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '77772071697'} />
  </NextIntlClientProvider>;
}
