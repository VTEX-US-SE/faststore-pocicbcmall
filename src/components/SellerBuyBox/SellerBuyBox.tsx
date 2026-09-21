import { usePDP } from '@faststore/core'
import Seller from '../common/Seller'
import styles from './sellerBuyBox.module.scss'
import { usePriceFormatter } from '../common/custom-hooks'

export default function SellerBuyBox({
  setSelectedSeller,
  selectedSeller,
}: any) {
  const { data } = usePDP()
  const priceFormatter = usePriceFormatter()
  const product = data?.product
  const offers = product?.offers.offers

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
          {filteredOffers.map((offer: any) => {
            return (
              <div key={offer.seller.identifier} className={styles.seller}>
                <input
                  id={offer.seller.identifier}
                  className={styles.input}
                  type="radio"
                  checked={selectedSeller === offer.seller.identifier}
                  onChange={() => {
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
                      {priceFormatter(Number(offer.listPrice))}{' '}
                    </div>
                    <div className={styles.finalPoints}>
                      {priceFormatter(Number(offer.price))}
                    </div>
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
