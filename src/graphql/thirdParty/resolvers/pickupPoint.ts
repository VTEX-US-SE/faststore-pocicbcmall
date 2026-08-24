import type { GetPickupPointQuery } from '@faststore/core/api'
import { getRequestInit } from '../helpers'

const pickupPointResolver = {
  Query: {
    getPickupPoint: async () => {
      const url = `https://pocicbcmall.vtexcommercestable.com.br/api/logistics/pvt/configuration/pickuppoints`
      const response = await fetch(url, getRequestInit())
      const data: GetPickupPointQuery['getPickupPoint'] = await response.json()
      return data
    },
  },
}

export default pickupPointResolver
