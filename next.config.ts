import allowedImageDomains from './allowedImageDomains';

const nextConfig = {
  images: {
    remotePatterns: allowedImageDomains.map((hostname) => ({
      protocol: 'https',
      hostname: hostname,
      pathname: '**',
    })),
  },
  // Impede que o Next.js tente fazer bundle de pacotes nativos do Node.js
  // firebase-admin, @google-cloud/* são pacotes server-only que usam módulos nativos
  serverExternalPackages: [
    'firebase-admin',
    '@google-cloud/firestore',
    'google-gax',
  ],
};

module.exports = nextConfig;
