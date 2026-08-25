module.exports = {
  seo: {
    title: 'ICBC Shopping',
    description:
      'Shop at major retailers, pay with exclusive conditions, and earn ICBC Puntos.',
    titleTemplate: '%s | ICBC Shopping',
    author: 'ICBC',
  },

  // Theming
  theme: 'custom-theme',

  // Ecommerce Platform
  platform: 'vtex',

  // Platform specific configs for API
  api: {
    storeId: 'pocicbcmall',
    workspace: 'master',
    environment: 'vtexcommercestable',
    hideUnavailableItems: true,
    incrementAddress: false,
  },

  // Default session
  session: {
    currency: {
      code: 'ARS',
      symbol: '$',
    },
    locale: 'es-AR',
    channel: '{"salesChannel":1,"regionId":""}',
    country: 'ARG',
    deliveryMode: null,
    addressType: null,
    postalCode: null,
    geoCoordinates: null,
    person: null,
  },

  cart: {
    id: '',
    items: [],
    messages: [],
    shouldSplitItem: true,
  },

  // Production URLs
  storeUrl: 'https://pocicbcmall.vtex.app',
  secureSubdomain: 'https://secure.vtexfaststore.com/',
  checkoutUrl: 'https://pocicbcmall.myvtex.com/checkout',
  loginUrl: 'https://pocicbcmall.myvtex.com/api/io/login',
  accountUrl: 'https://pocicbcmall.myvtex.com/account',

  previewRedirects: {
    home: '/',
    plp: '/electronicos',
    search: '/s?q=Samsung',
    pdp: '/fastshop-104/p',
  },

  // Lighthouse CI
  lighthouse: {
    server: process.env.BASE_SITE_URL || 'http://localhost:3000',
    pages: {
      home: '/',
      pdp: '/cea-108/p',
      collection: '/eletronicos',
    },
  },

  // E2E CI
  cypress: {
    pages: {
      home: '/',
      pdp: '/cea-108/p',
      collection: '/eletronicos',
      collection_filtered:
        '/eletronicos?category-1=eletronicos&operator=and&brand=Samsung',
      search: '/s?q=Samsung',
    },
    browser: 'electron',
  },

  analytics: {
    // https://developers.google.com/tag-platform/tag-manager/web#standard_web_page_installation,
    // gtmContainerId: "",
  },

  experimental: {
    nodeVersion: 24,
    cypressVersion: 12,
  },

  contentSource: {
    type: 'CP',
  },

  // Localization (multi-region/multi-currency) is disabled: ICBC Mall is
  // single-region (Argentina, ARS only). session.currency/locale above already
  // cover this. Enabling this flag makes the build fetch Localization Settings
  // live from VTEX Admin for this account — turn it on only if that gets
  // configured there for real multi-locale support.
  localization: {
    enabled: false,
  },

  vtexHeadlessCms: {
    webhookUrls: [
      'https://pocicbcmall.myvtex.com/cms-releases/webhook-releases',
    ],
  },
}
