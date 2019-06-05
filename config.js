const allConfig = {
    "dev": {
        port: 5400
    }
};

const environment = process.env.NODE_ENV || 'dev';
const config = allConfig[environment];

export default config;
