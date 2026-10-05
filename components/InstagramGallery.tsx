import Image from 'next/image';
import { useTranslations } from 'next-intl';
import highlights from '@/data/highlights.json';
import { whatsappDraftHref } from '@/lib/quote.mjs';
import GalleryRail from './GalleryRail';
import LiveStories from './LiveStories';
import MopedPhotos from './MopedPhotos';
import styles from './InstagramGallery.module.css';

export default function InstagramGallery() {
  const t = useTranslations('gallery');
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '77772071697';
  return <section className={styles.section} aria-labelledby="instagram-gallery-title">
    <div className={styles.inner}>
      <header className={styles.header}>
        <h2 id="instagram-gallery-title" className="sr-only">{t('heading')}</h2>
        <div className={styles.headerLinks}>
          <a href={highlights.source} target="_blank" rel="noopener noreferrer">@drivepro.moped.almaty</a>
          <a href={whatsappDraftHref(whatsapp, t('message'))} target="_blank" rel="noopener noreferrer">{t('ask')}</a>
        </div>
      </header>
      <LiveStories copy={{ title: t('live_title'), empty: t('empty'), failed: t('failed'), retry: t('retry'), open: t('open'), previous: t('previous'), next: t('next'), ask: t('ask'), message: t('story_message'), updated: t('updated') }} />
      <MopedPhotos />
      <div className={styles.saved}>
      <GalleryRail title={t('saved')} previous={t('previous')} next={t('next')}>
        {highlights.items.map(item => <article key={item.id} className={styles.card}>
          <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`${item.title} — ${t('open')}`} className={styles.cover}>
            <Image src={item.cover} width={150} height={150} alt={item.title} loading="lazy" />
          </a>
          <p className={styles.label}>{t('saved')}</p>
          <h3>{item.title}</h3>
          <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.instagram}>{t('open')}</a>
          <a href={whatsappDraftHref(whatsapp, t('model_message', { model: item.title }))} target="_blank" rel="noopener noreferrer" className={styles.enquiry}>{t('ask_model')}</a>
        </article>)}
      </GalleryRail>
      </div>
      <div className={styles.footer}>
        <p>{t('availability')}</p>
        <a className="action-primary" href={whatsappDraftHref(whatsapp, t('message'))} target="_blank" rel="noopener noreferrer">{t('ask')}</a>
      </div>

    </div>
  </section>;
}
