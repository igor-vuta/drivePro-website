import '../globals.css';
import { siteBasePath, siteOrigin } from '@/lib/site';

export default function ExcavatorsLayout({ children }: { children: React.ReactNode }) {
  const organization = { '@context': 'https://schema.org', '@type': 'Organization', name: 'Drive Pro', url: `${siteOrigin}${siteBasePath}/` };
  return <html lang="ru"><body className="bg-jet-black text-cream">
    <script type="application/ld+json">{JSON.stringify(organization).replace(/</g, '\\u003c')}</script>
    {children}
  </body></html>;
}
