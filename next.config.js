const LOCAL = 'http://localhost:3000/';
const PROD = 'https://nextjs-d3-tailwind-32erw0xcg-somedaycode.vercel.app/';

const isProduction = process.env.NODE_ENV !== 'production';

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // images: {
  //   loader: 'imgix',
  //   path: isProduction ? LOCAL : PROD,
  // },
};
