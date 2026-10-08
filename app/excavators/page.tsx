import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import EquipmentExperience from '@/components/EquipmentExperience';
import messages from '@/messages/ru.json';
import { pageMetadata } from '@/lib/site';

export async function generateMetadata() {
  return pageMetadata('ru', 'excavators');
}

export default function ExcavatorsPage() {
  setRequestLocale('ru');
  const questions = ['operator', 'price', 'unknown', 'whatsapp'] as const;
  return <NextIntlClientProvider locale="ru" messages={messages}>
    <EquipmentExperience
      phoneNumber={process.env.NEXT_PUBLIC_PHONE_NUMBER || '+7 (777) 207-16-97'}
      whatsappNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '77772071697'}
      faqTitle={messages.services.faq_title}
      faq={questions.map(key => ({ key, question: messages.services[`faq_${key}_question`], answer: messages.services[`faq_${key}_answer`] }))}
    />
  </NextIntlClientProvider>;
}
