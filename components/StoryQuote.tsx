import { useTranslations } from 'next-intl';

export default function StoryQuote() {
  const t = useTranslations('story');

  return (
    <section className="bg-charcoal py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <blockquote className="border-l-8 border-gold pl-6 md:pl-10 text-cream italic text-2xl md:text-4xl leading-tight font-black tracking-wide">
          {t('quote')}
        </blockquote>
      </div>
    </section>
  );
}
