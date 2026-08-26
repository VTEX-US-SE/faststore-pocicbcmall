import { SectionOverride, usePDP } from '@faststore/core'
import {
  ProductPrice,
  ProductTitle,
  ShippingSimulation,
  BuyButton,
} from '@faststore/ui'
import SellerBuyBox from '../SellerBuyBox'
import divMaluca from '../SellerBuyBox/divMaluca'
import { usePriceFormatter } from '../common/custom-hooks'
import {
  cartStore_unstable as useCart,
  useSession_unstable as useSession,
} from '@faststore/core/experimental'
import { useCartWithPoints } from '../common/custom-hooks/useCartWithPoints'
import { useGetOrderFormId } from '../common/custom-hooks/useOrderForm'
import { useEffect, useRef, useState } from 'react'

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
        const {
          locale,
          currency: { code: currencyCode },
        } = useSession()
        const { data: dataProduct } = usePDP()
        const { cpp, offers, id } = dataProduct.product
        const cartInfo = read()
        const { addToCartWithPoints } = useCartWithPoints({
          orderformId: cartInfo.id,
        })
        const [selectedSeller, setSelectedSeller] = useState<string>(
          props['data-seller']
        )
        const selectedOffer = offers.offers.find((offer: any) => {
          return offer?.seller?.identifier === selectedSeller
        })
        const [buyButtonEnable, setBuyButtonEnable] = useState(
          !!cartInfo.id && cartInfo.id !== ''
        )
        const { data } = useGetOrderFormId()
        const priceDivRef = useRef<Element | null>(null)

        const listPoints = (
          Number(selectedOffer.listPrice) / Number(cpp)
        ).toFixed(0)
        const finalPoints = (Number(selectedOffer.price) / Number(cpp)).toFixed(
          0
        )

        // Initialise gambiarra on the client only — never runs during SSR
        useEffect(() => {
          if (typeof window === 'undefined') return

          //@ts-ignore
          window.gambiarra = { pointValue: `60|${cpp}` }
        }, [cpp])

        // DOM manipulation + event listeners — client-only, inside useEffect with cleanup
        useEffect(() => {
          if (typeof window === 'undefined' || id === '98') return

          const priceDiv = document.querySelector('span[data-fs-price="true"]')
          priceDivRef.current = priceDiv

          priceDiv?.setHTMLUnsafe(
            divMaluca({
              ponto1: listPoints,
              ponto2: finalPoints,
              ponto3: Number(listPoints) * 0.8,
              ponto4: Number(listPoints) * 0.7,
              ponto5: Number(listPoints) * 0.6,
              preco1: Number(selectedOffer.listPrice) * 0.2,
              preco2: Number(selectedOffer.listPrice) * 0.3,
              preco3: Number(selectedOffer.listPrice) * 0.4,
              locale,
              currencyCode,
            })
          )

          const handler100 = () => {
            //@ts-ignore
            window.gambiarra = { pointValue: `100|${cpp}` }
          }
          const handler80 = () => {
            //@ts-ignore
            window.gambiarra = { pointValue: `80|${cpp}` }
          }
          const handler70 = () => {
            //@ts-ignore
            window.gambiarra = { pointValue: `70|${cpp}` }
          }
          const handler60 = () => {
            //@ts-ignore
            window.gambiarra = { pointValue: `60|${cpp}` }
          }

          const inputPrice100 = document.getElementById('inputPrice100')
          const inputPrice80 = document.getElementById('inputPrice80')
          const inputPrice70 = document.getElementById('inputPrice70')
          const inputPrice60 = document.getElementById('inputPrice60')

          inputPrice100?.addEventListener('change', handler100)
          inputPrice80?.addEventListener('change', handler80)
          inputPrice70?.addEventListener('change', handler70)
          inputPrice60?.addEventListener('change', handler60)

          return () => {
            inputPrice100?.removeEventListener('change', handler100)
            inputPrice80?.removeEventListener('change', handler80)
            inputPrice70?.removeEventListener('change', handler70)
            inputPrice60?.removeEventListener('change', handler60)
          }
        }, [id, cpp, listPoints, finalPoints, selectedOffer, locale, currencyCode])

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
          const pointsValue = isSubscription
            ? `0|${cpp}`
            : typeof window !== 'undefined'
            ? //@ts-ignore
              window.gambiarra?.pointValue ?? `60|${cpp}`
            : `60|${cpp}`

          await addToCartWithPoints({
            params: {
              orderformId: cartInfo.id,
              productId: props['data-sku'],
              sellerId: selectedSeller,
              quantity: '1',
              attachment: pointsValue,
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
              priceDiv={priceDivRef.current}
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
