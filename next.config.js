module.exports = {
  trailingSlash: true,
  images: {
    domains: ['eventozz.s3.us-west-1.amazonaws.com', 'localhost', 'api.pagar.me']
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    // if (!isServer) {
    //   config.node = {
    //     fs: 'empty',
    //     net: 'empty',
    //   };
    // }

    return config;
  },
};
