import { readFileSync } from 'node:fs';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import PlayActivation from './PlayActivation';

const shellStyles = readFileSync('components/OptionalPlayShell.css', 'utf8');

export default function OptionalPlay() {
  const t = useTranslations('play');
  const locale = useLocale();

  return (
    <>
      <style href="drivepro-optional-play-shell" precedence="default">{shellStyles}</style>
      <section className="optional-play" aria-labelledby="optional-play-title">
        <div className="optional-play-inner">
          <div className="optional-play-intro">
            <div>
              <h2 id="optional-play-title" className="optional-play-heading">{t('heading')}</h2>
              <p>{t('intro')}</p>
            </div>
          </div>
          <div className="optional-play-preview" aria-hidden="true"><span className="preview-platform" /><span className="preview-tracks" /><span className="preview-cab" /><span className="preview-boom" /><span className="preview-soil" /></div>
          <PlayActivation />
          <p className="optional-play-note">{t('illustration_note')}</p>
          <nav className="optional-play-links" aria-label={t('heading')}>
            <Link href={`/${locale}/services`} prefetch={false}>{t('equipment_link')}</Link>
            <Link href={`/${locale}/mopeds`} prefetch={false}>{t('moped_link')}</Link>
            <Link href={`/${locale}/contact`} prefetch={false}>{t('contact_link')}</Link>
          </nav>
        </div>
      </section>
    </>
  );
}
