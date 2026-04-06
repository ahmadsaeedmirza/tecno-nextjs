import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Internal Next.js/Vercel paths (_next, _vercel)
  // - Files in the public folder (favicon.ico, robots.txt, sitemap.xml, images)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
