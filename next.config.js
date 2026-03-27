/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  transpilePackages: ['antd', '@ant-design/icons'],
  
  // Empty turbopack config to silence the warning
  turbopack: {},
  
  webpack: (config, { isServer }) => {
    // Optimize heavy libraries
    config.resolve.alias = {
      ...config.resolve.alias,
      'echarts': 'echarts/dist/echarts.min.js',
    };

    // Split heavy libraries into separate chunks
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
            charts: {
              test: /[\\/]node_modules[\\/](echarts|echarts-for-react|highcharts)[\\/]/,
              name: 'charts',
              chunks: 'all',
              priority: 20,
            },
            sigma: {
              test: /[\\/]node_modules[\\/]sigma[\\/]/,
              name: 'sigma',
              chunks: 'all',
              priority: 15,
            },
            editor: {
              test: /[\\/]node_modules[\\/](@tiptap|prosemirror)[\\/]/,
              name: 'editor',
              chunks: 'all',
              priority: 10,
            },
          },
        },
      };
    }

    return config;
  },

  // Configure headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
