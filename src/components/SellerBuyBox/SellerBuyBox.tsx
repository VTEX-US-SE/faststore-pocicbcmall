import { usePDP } from '@faststore/core'
import { useSession_unstable as useSession } from '@faststore/core/experimental'
import Seller from '../common/Seller'
import styles from './sellerBuyBox.module.scss'
import divMaluca, { formatCash, formatPoints } from './divMaluca'

export default function SellerBuyBox({
  setSelectedSeller,
  selectedSeller,
  priceDiv,
}: any) {
  const { data } = usePDP()
  const {
    locale,
    currency: { code: currencyCode },
  } = useSession()
  const product = data?.product
  const offers = product?.offers.offers
  const cpp: any = product.cpp

  const filteredOffers = offers?.filter(
    (o) => o.availability === 'https://schema.org/InStock'
  )

  if (!filteredOffers?.length || filteredOffers?.length == 1) {
    return null
  }

  return (
    <section data-fs-product-details-section className={styles.sellerBuyBox}>
      <div className={styles.content}>
        <h2 className={`text__title-mini ${styles.title}`}>Our partners</h2>
        <div className={styles.offerList}>
          {filteredOffers.map((offer: any, index: number) => {
            const listPoints = (Number(offer.listPrice) / Number(cpp)).toFixed(
              0
            )
            const finalPoints = (Number(offer.price) / Number(cpp)).toFixed(0)

            return (
              <div key={offer.seller.identifier} className={styles.seller}>
                <input
                  id={offer.seller.identifier}
                  className={styles.input}
                  type="radio"
                  checked={selectedSeller === offer.seller.identifier}
                  onChange={() => {
                    priceDiv?.setHTMLUnsafe(
                      divMaluca({
                        ponto1: listPoints,
                        ponto2: finalPoints,
                        ponto3: Number(listPoints) * 0.8,
                        ponto4: Number(listPoints) * 0.7,
                        ponto5: Number(listPoints) * 0.6,
                        preco1: Number(offer.listPrice) * 0.2,
                        preco2: Number(offer.listPrice) * 0.3,
                        preco3: Number(offer.listPrice) * 0.4,
                        locale,
                        currencyCode,
                      })
                    )

                    const inputPrice100 =
                      document.getElementById('inputPrice100')

                    inputPrice100?.addEventListener('change', () => {
                      //@ts-ignore
                      window.gambiarra = {
                        pointValue: `100|${cpp}`,
                      }
                    })

                    const inputPrice80 = document.getElementById('inputPrice80')

                    inputPrice80?.addEventListener('change', () => {
                      //@ts-ignore
                      window.gambiarra = {
                        pointValue: `80|${cpp}`,
                      }
                    })

                    const inputPrice70 = document.getElementById('inputPrice70')

                    inputPrice70?.addEventListener('change', () => {
                      //@ts-ignore
                      window.gambiarra = {
                        pointValue: `70|${cpp}`,
                      }
                    })

                    const inputPrice60 = document.getElementById('inputPrice60')

                    inputPrice60?.addEventListener('change', () => {
                      //@ts-ignore
                      window.gambiarra = {
                        pointValue: `60|${cpp}`,
                      }
                    })

                    setSelectedSeller(offer.seller.identifier)
                  }}
                />
                <label
                  id={offer.seller.identifier}
                  htmlFor={offer.seller.identifier}
                ></label>
                <div className={styles.priceInfo}>
                  <div className={styles.seller}>
                    <Seller
                      id={offer.seller.identifier}
                      showLogoIfPossible={false}
                    />
                  </div>
                  <div className={styles.forPrice}>
                    <div className={styles.listPoints}>
                      {formatPoints(Number(listPoints), locale)}{' '}
                    </div>
                    <div className={styles.finalPoints}>
                      {formatPoints(Number(finalPoints), locale)}
                    </div>
                  </div>
                  <div>
                    or {formatPoints(Number(listPoints) * 0.6, locale)}
                    {' + '}
                    {formatCash(
                      Number(offer.listPrice) * 0.4,
                      locale,
                      currencyCode
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
