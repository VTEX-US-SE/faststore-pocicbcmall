import { SectionOverride, usePDP } from '@faststore/core'
import {
  ProductPrice,
  ProductTitle,
  ShippingSimulation,
  BuyButton,
} from '@faststore/ui'
import SellerBuyBox from '../SellerBuyBox'
import { usePriceFormatter } from '../common/custom-hooks'
import { cartStore_unstable as useCart } from '@faststore/core/experimental'
import { useCartWithPoints } from '../common/custom-hooks/useCartWithPoints'
import { useGetOrderFormId } from '../common/custom-hooks/useOrderForm'
import { useEffect, useState } from 'react'

const SECTION = 'ProductDetails' as const
const SUBSCRIPTION_SKUS = ['98']

const override: SectionOverride = {
  section: SECTION,
  components: {
    QuantitySelector: {
      Component: () => <></>,
    },
    ProductTitle: {
      Component: (props) => (
        <>
          <ProductTitle {...props} />
        </>
      ),
    },
    ProductPrice: {
      Component: (props) => {
        const formatter = usePriceFormatter()
        return <ProductPrice {...props} formatter={formatter} />
      },
    },
    BuyButton: {
      Component: (props: any) => {
        const { read, set } = useCart
        const { data: dataProduct } = usePDP()
        const { cpp } = dataProduct.product
        const cartInfo = read()
        const { addToCartWithPoints } = useCartWithPoints({
          orderformId: cartInfo.id,
        })
        const [selectedSeller, setSelectedSeller] = useState<string>(
          props['data-seller']
        )
        const [buyButtonEnable, setBuyButtonEnable] = useState(
          !!cartInfo.id && cartInfo.id !== ''
        )
        const { data } = useGetOrderFormId()

        useEffect(() => {
          if (
            !cartInfo.id &&
            data?.getOrderFormId?.orderFormId &&
            !buyButtonEnable
          ) {
            const newOrderFormId = data?.getOrderFormId?.orderFormId
            set({
              ...cartInfo,
              id: newOrderFormId,
            })
            setBuyButtonEnable(true)
          } else if (cartInfo.id && !buyButtonEnable) {
            setBuyButtonEnable(true)
          }
        }, [data])

        const handleAddButton = async (isSubscription = false) => {
          await addToCartWithPoints({
            params: {
              orderformId: cartInfo.id,
              productId: props['data-sku'],
              sellerId: selectedSeller,
              quantity: '1',
              attachment: `0|${cpp}`,
              isSubscription,
            },
          })
        }

        return (
          <>
            <BuyButton
              {...props}
              loading={props.loading || !buyButtonEnable}
              onClick={async (e) => {
                e.preventDefault()

                const currentSku = dataProduct?.product?.id
                const isSubscription = SUBSCRIPTION_SKUS.includes(currentSku)

                await handleAddButton(isSubscription)
              }}
            />
            <SellerBuyBox
              setSelectedSeller={setSelectedSeller}
              selectedSeller={selectedSeller}
            />
          </>
        )
      },
    },
    ShippingSimulation: {
      Component: (props) => (
        <>
          <ShippingSimulation {...props} />
        </>
      ),
    },
  },
}

export { override }
