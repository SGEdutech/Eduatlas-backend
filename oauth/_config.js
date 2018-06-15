const ids = {
    facebook: {
        clientID: '295919860935591',
        clientSecret: '7d342a0a9ff60b4f95769b74af58d687',
        callbackURL: "/auth/facebook/redirect",
        scope: ['email']
    },
    google: {
        clientID: '453550727083-koh15o7kv6b16a05vk6hknproo9kbmmb.apps.googleusercontent.com',
        clientSecret: 'VR2dJRSQrV6fZeM4zgV2MF9_',
        callbackURL: "/auth/google/redirect",
        scope: ['profile', 'phone', 'email']
    }
};

const keys = {
    CookieKey: 'somesecretstring'
};

exports = module.exports = {
    ids, keys
};