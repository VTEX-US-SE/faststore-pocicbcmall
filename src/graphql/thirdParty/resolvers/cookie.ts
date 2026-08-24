import type {
  GetCookieByDocumentQueryVariables,
  GetCookieByDocumentQuery,
} from '@faststore/core/api'

const cookieResolver = {
  Query: {
    getCookieByDocument: async (
      _: unknown,
      { dId }: GetCookieByDocumentQueryVariables
    ) => {
      if (!dId) {
        return {
          hash: null,
          token: null,
        }
      }
      const result: GetCookieByDocumentQuery['getCookieByDocument'] =
        await getMasterDataFromExternalService(dId)
      return result
    },
  },
}

async function getMasterDataFromExternalService(dId: string) {
  const url = `https://pocicbcmall.myvtex.com/_v/token/document/${dId}`
  const response = await fetch(url)
  const data: { hash: string; token: string } = await response.json()

  return data
}

export default cookieResolver
