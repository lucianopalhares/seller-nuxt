import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: process.env.PROJECT_NAME,
    title: process.env.PROJECT_NAME,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  middleware: 'auth',

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  server: {
    host: '0.0.0.0',  // Permite que o Nuxt ouça em todas as interfaces de rede
    port: 3000,        // Porta onde o Nuxt vai rodar
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/vuetify.js' },
    { src: '~/plugins/axios.js'}
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/pwa',
    ['@nuxtjs/axios', {
      requestInterceptor (config) {
        config.headers.common['Content-Type'] = 'multipart/form-data;'
        return config
      }
    }],
    '@nuxtjs/proxy',
    '@nuxtjs/toast',
    '@nuxtjs/auth',
    '@nuxt/http'
  ],

  pwa: {
    manifest: {
      name: process.env.PROJECT_NAME,
      short_name: 'Nuxt.js PWA',
      start_url: '/',
      theme_color: '#424242',
      display: 'standalone',
    },
    icon: {
      iconSrc: './static/favicon.ico',
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  axios: {
    baseURL: process.env.URL_API,
    redirectError: {
      404: '/notfound'
    }
  },

  proxy: {
    '/api': {
      target: process.env.URL_API,
      pathRewrite: {
        '^/api': '/'
      },
      changeOrigin: true
    }
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: `${process.env.URL_API}/login`, method: 'post', propertyName: 'token' },  // URL para login
          logout: { url: `${process.env.URL_API}/logout`, method: 'post' },  // URL para logout
          user: { url: `${process.env.URL_API}/user`, method: 'get', propertyName: 'data' },  // URL para obter dados do usuário
          register: { url: `${process.env.URL_API}/register`, method: 'post', propertyName: 'token' }  // URL para cadastrar usuário
        },
        tokenRequired: true,  // Indica que o token é necessário para as requisições subsequentes
        tokenType: 'Bearer'   // Define o tipo do token como 'Bearer'
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      user: '/profile',
      home: false
    }
  },
}
