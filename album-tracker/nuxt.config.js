module.exports = {
    head: {
        title: 'album-tracker',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Album Tracker'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },

    loading: {color: '#3B8070'},

    modules: [
        '@nuxtjs/font-awesome',
        'bootstrap-vue/nuxt'
    ],

    css: [
        './assets/css/main.css'
    ],

    build: {
        vendor: ['axios'],

        extractCSS: true,

        // Auto-run eslint
        extend(config, {isDev, isClient}) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    }
};
