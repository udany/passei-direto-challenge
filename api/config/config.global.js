let cfg = {
    port: 3001,
    debug: true,
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'album-tracker'
    },
    spotify: {
        clientId: 'fa59df3b0785496e863f1c1c1415dddf',
        secret: '2fd638d28ff14401a2451d0139a3c308'
    }
};

module.exports = cfg;