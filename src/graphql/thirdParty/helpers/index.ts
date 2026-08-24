export const getRequestInit = (method = 'GET', headers = {}): RequestInit => ({
  method,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // TODO: same new "pocicbcmall" AppKey/AppToken pair as src/env.local.js
    'X-VTEX-API-AppKey': 'REPLACE_WITH_POCICBCMALL_APPKEY',
    'X-VTEX-API-AppToken': 'REPLACE_WITH_POCICBCMALL_APPTOKEN',
    ...headers,
  },
})
