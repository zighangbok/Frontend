import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/join', // 시작 페이지를 /join으로 설정
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
