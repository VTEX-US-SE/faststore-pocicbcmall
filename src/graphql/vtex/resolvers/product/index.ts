import type { StoreProductRoot } from '@faststore/core/api'

const productResolver = {
  StoreProduct: {
    cpp: (root: StoreProductRoot) => {
      const cppValue =
        root?.isVariantOf?.specificationGroups
          ?.find((specificationGroup) => specificationGroup.name === 'Puntos')
          ?.specifications?.find(
            (specification) => specification.name === 'CPP'
          )?.values?.[0] || '100'

      return cppValue
    },
    redirectUrl: (root: StoreProductRoot) => {
      const redirectValue =
        root?.isVariantOf?.specificationGroups
          ?.find((specificationGroup) => specificationGroup.name === 'Redirect')
          ?.specifications?.find(
            (specification) => specification.name === 'Redirect'
          )?.values?.[0] || '/'

      return redirectValue
    },
  },
}

export default productResolver
