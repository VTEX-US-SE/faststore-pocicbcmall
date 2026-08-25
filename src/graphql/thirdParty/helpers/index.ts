export const getRequestInit = (method = 'GET', headers = {}): RequestInit => ({
  method,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-VTEX-API-AppKey': 'vtexappkey-pocicbcmall-QNVRIJ',
    'X-VTEX-API-AppToken':
      'FEGQKCGROPMZOMLFUZSLURPBSNBEDRHIYLULVISVXMNJFNQAIBIWQWYOKZAKNXTHZNOPCTZYRWTFCANCDNLYDWSCJDTKYMDGVSCWMVMAPWIPZXPFTBEEIPNVSDKJBADU',
    ...headers,
  },
})
