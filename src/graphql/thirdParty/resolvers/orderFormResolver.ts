import type { GetOrderFormIdQuery } from '@faststore/core/api'

const orderFormResolver = {
  Query: {
    getOrderFormId: async () => {
      const orderFormId = await getOrderFormIdFromExternalService()
      const response: GetOrderFormIdQuery['getOrderFormId'] = { orderFormId }
      return response
    },
  },
}

async function getOrderFormIdFromExternalService(): Promise<string> {
  const account = 'pocicbcmall'
  const url = `https://${account}.vtexcommercestable.com.br/api/checkout/pub/orderForm?forceNewCart=true`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Failed to fetch orderFormId: ${text}`)
  }

  const data = await response.json()
  return data.orderFormId
}

export default orderFormResolver
