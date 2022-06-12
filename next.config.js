const path = require("path");

module.exports = {

    images: {
        domains: ['img.seadn.io'],
        domains: ['https://nuron-nextjs.vercel.app/'],
        domains: ['zoho-xscc.s3.ap-south-1.amazonaws.com']
    },

    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, "./src/assets/scss")],
    },

    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // eslint-disable-next-line no-param-reassign
        config.ignoreWarnings = [
            {
                message:
                    /(magic-sdk|@walletconnect\/web3-provider|@web3auth\/web3auth)/,
            },
        ];
        return config;
    },
};
