import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ru', 'kz'],
  defaultLocale: 'ru',
});

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};
