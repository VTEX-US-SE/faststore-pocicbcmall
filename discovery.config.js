module.exports = {
  seo: {
    title: 'ICBC Shopping',
    description:
      'Shop at major retailers, pay with exclusive conditions, and earn Esfera points.',
    titleTemplate: '%s | ICBC Shopping',
    author: 'ICBC',
  },

  // Theming
  theme: 'custom-theme',

  // Ecommerce Platform
  platform: 'vtex',

  // Platform specific configs for API
  api: {
    storeId: 'pocsanbesfera',
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
    channel: '{"salesChannel":3,"regionId":""}',
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
  storeUrl: 'https://santander.b2cdemostore.com',
  secureSubdomain: 'https://santander.b2cdemostore.com',
  checkoutUrl: 'https://santander.b2cdemostore.com/checkout',
  loginUrl: 'https://santander.b2cdemostore.com/api/io/login',
  accountUrl: 'https://santander.b2cdemostore.com/account',

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

  localization: {
    enabled: true,
    currencies: {
      BRL: {
        code: "BRL",
        name: "Brazilian Real",
        symbol: "R$",
      },
      GBP: {
        code: "GBP",
        name: "British Pound",
        symbol: "£",
      },
      EUR: {
        code: "EUR",
        name: "Euro",
        symbol: "€",
      },
      ARS: {
        code: "ARS",
        name: "Argentine Peso",
        symbol: "$",
      },
    },
  },

  vtexHeadlessCms: {
    webhookUrls: [
      'https://pocsanbesfera.myvtex.com/cms-releases/webhook-releases',
    ],
  },
}
