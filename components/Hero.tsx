import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { sectionPath, siteBasePath, type Locale } from '@/lib/site';
import WelcomeArrival from './WelcomeArrival';
import styles from './Welcome.module.css';

export default function Hero() {
  const t = useTranslations('home');
  const locale = useLocale() as Locale;
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+7 (777) 207-16-97';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '77772071697';

  return <WelcomeArrival>
    <header className={styles.intro}>
      <p className={styles.eyebrow}>{t('location')} <span aria-hidden="true">·</span> {t('greeting')}</p>
      <h1 id="welcome-title">{t('headline')}</h1>
    </header>
    <div className={styles.choices}>
      <Link href={sectionPath(locale, 'excavators')} prefetch={false} className={`${styles.choice} ${styles.equipment}`} data-destination="equipment">
        <span className={styles.visual} aria-hidden="true">
          <span className={styles.lean}>
            <picture>
              <source type="image/avif" srcSet={`${siteBasePath}/welcome/excavator-360.avif 360w, ${siteBasePath}/welcome/excavator-720.avif 720w`} sizes="(max-width: 600px) 140px, (max-width: 900px) 280px, 400px" />
              <source type="image/webp" srcSet={`${siteBasePath}/welcome/excavator-360.webp 360w, ${siteBasePath}/welcome/excavator-720.webp 720w`} sizes="(max-width: 600px) 140px, (max-width: 900px) 280px, 400px" />
              <Image unoptimized src={`${siteBasePath}/welcome/excavator-360.webp`} width={1536} height={1024} alt="" loading="eager" fetchPriority="high" className={styles.art} data-welcome-art="excavator" />
            </picture>
          </span>
        </span>
        <span className={styles.description}>
          <span className={styles.label}>{t('equipment_title')}</span>
          <span className={styles.helper}>{t('equipment_text')}</span>
          <span className={`${styles.cta} ${styles.primary}`}>{t('equipment_action')} <span aria-hidden="true">↗</span></span>
        </span>
      </Link>
      <Link href={sectionPath(locale, 'mopeds')} prefetch={false} className={`${styles.choice} ${styles.mopeds}`} data-destination="mopeds">
        <span className={styles.visual} aria-hidden="true">
          <span className={styles.lean}>
            <picture>
              <source type="image/avif" srcSet={`${siteBasePath}/welcome/moped-360.avif 360w, ${siteBasePath}/welcome/moped-720.avif 720w`} sizes="(max-width: 600px) 140px, (max-width: 900px) 260px, 300px" />
              <source type="image/webp" srcSet={`${siteBasePath}/welcome/moped-360.webp 360w, ${siteBasePath}/welcome/moped-720.webp 720w`} sizes="(max-width: 600px) 140px, (max-width: 900px) 260px, 300px" />
              <Image unoptimized src={`${siteBasePath}/welcome/moped-360.webp`} width={1254} height={1254} alt="" loading="eager" className={styles.art} data-welcome-art="moped" />
            </picture>
          </span>
        </span>
        <span className={styles.description}>
          <span className={styles.label}>{t('moped_title')}</span>
          <span className={styles.helper}>{t('moped_text')}</span>
          <span className={`${styles.cta} ${styles.secondary}`}>{t('moped_action')} <span aria-hidden="true">↗</span></span>
        </span>
      </Link>
    </div>
    <div className={styles.contact}>
      <a href={`tel:${phoneNumber.replace(/[^+\d]/g, '')}`} aria-label={`${t('call')}: ${phoneNumber}`}><span aria-hidden="true">↗</span> {phoneNumber}</a>
      <span className={styles.contactDivider} aria-hidden="true">·</span>
      <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">WhatsApp <span aria-hidden="true">↗</span></a>
    </div>
    <p className={styles.note}>{t('illustration_note')}</p>
  </WelcomeArrival>;
}
