export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Drive Pro',
    telephone: '+77772071697',
    foundingDate: '2018',
    areaServed: 'Казахстан',
    priceRange: '₸₸',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://drivepro.kz',
    sameAs: ['https://www.instagram.com/drivepro.moped.almaty'],
  };

  return (
    <html lang="ru">
      <body className="bg-jet-black text-cream font-oswald">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
