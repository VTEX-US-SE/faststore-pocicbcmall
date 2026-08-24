import type {
  GetSellerQuery,
  GetSellerQueryVariables,
} from '@faststore/core/api'
import { getRequestInit } from '../helpers'

const sellerResolver = {
  Query: {
    getSeller: async (_: unknown, { id }: GetSellerQueryVariables) => {
      const url = `https://pocicbcmall.vtexcommercestable.com.br/api/seller-register/pvt/sellers/${id}?sc=1`
      const response = await fetch(url, getRequestInit())
      const data: GetSellerQuery['getSeller'] = await response.json()

      return data
    },
  },
}

export default sellerResolver
