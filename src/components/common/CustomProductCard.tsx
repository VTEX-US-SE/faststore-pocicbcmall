import type { ProductSummary_ProductFragment } from '@faststore/core/api'
import {
  CartItem,
  Image_unstable as Image,
  cartStore_unstable as useCart,
  useCartToggleButton_unstable as useCartToggleButton,
  useProductLink_unstable as useProductLink,
} from '@faststore/core/experimental'
import {
  BuyButton,
  Icon,
  ProductCard as UIProductCard,
  ProductCardContent as UIProductCardContent,
  ProductCardImage as UIProductCardImage,
} from '@faststore/ui'
import { ImageProps } from 'next/image'
import NextLink from 'next/link'
import { memo, useMemo } from 'react'
import styles from './customProductCard.module.scss'
import { usePointsFormatter } from './custom-hooks/usePointsFormatter'
import { usePriceFormatter } from './custom-hooks/usePriceFormatter'

type Variant = 'wide' | 'default'

interface CustomProductCardProps {
  product: ProductSummary_ProductFragment
  index: number
  /**
   * Sets a border to the component.
   */
  bordered?: boolean
  /**
   * Sets the component's size.
   */
  variant?: Variant
  /**
   * Specifies the ProductCard image's aspect ratio.
   */
  aspectRatio?: number
  /**
   * Specifies the ProductCard image's props.
   */
  imgProps?: Partial<ImageProps>
  /**
   * Specifies Rating Value of the product.
   */
  ratingValue?: number
  /**
   * Callback function when button is clicked.
   */
  onButtonClick?: () => void
  /**
   * Specifies the button's label.
   */
  buttonLabel?: string
  /**
   * Enables a DiscountBadge to the component.
   */
  showDiscountBadge?: boolean
}

function CustomProductCard({
  product,
  index,
  bordered = true,
  variant = 'default',
  aspectRatio = 1,
  imgProps,
  ratingValue,
  buttonLabel = 'Add',
  onButtonClick,
  showDiscountBadge = true,
  ...otherProps
}: CustomProductCardProps) {
  const {
    sku,
    isVariantOf: { name },
    image: [img],
    offers: {
      lowPrice: spotPrice,
      offers: [{ seller, listPrice, availability }],
    },
  } = product

  const linkProps = {
    ...useProductLink({ product, selectedOffer: 0, index }),
    as: NextLink,
    passHref: true,
    legacyBehavior: false,
    prefetch: false,
  }

  const { onClick: toggleCart } = useCartToggleButton()
  const { addItem } = useCart
  const pointsFormatter = usePointsFormatter()
  const priceFormatter = usePriceFormatter()
  //@ts-ignore
  const cpp = Number(product.cpp)
  const points = pointsFormatter(spotPrice * cpp)

  const outOfStock = useMemo(
    () => availability !== 'https://schema.org/InStock',
    [availability]
  )

  const hasDiscount = spotPrice <= listPrice

  return (
    <UIProductCard
      outOfStock={outOfStock}
      bordered={bordered}
      variant={variant}
      data-fs-product-card-sku={sku}
      {...otherProps}
    >
      <UIProductCardImage aspectRatio={aspectRatio}>
        <Image
          src={img.url}
          alt={img.alternateName}
          sizes={`${imgProps?.sizes ?? '(max-width: 768px) 40vw, 30vw'}`}
          width={imgProps?.width ?? 360}
          height={Math.round((Number(imgProps?.height) || 360) / aspectRatio)}
          loading={imgProps?.loading}
        />
      </UIProductCardImage>
      <UIProductCardContent
        title={name}
        price={{
          value: spotPrice,
          listPrice,
          formatter: priceFormatter,
        }}
        ratingValue={ratingValue}
        outOfStock={outOfStock}
        outOfStockLabel="Out of stock"
        onButtonClick={onButtonClick}
        linkProps={linkProps}
        showDiscountBadge={hasDiscount && showDiscountBadge}
      />
      <span className={styles.points}>{points}</span>
      <BuyButton
        disabled={outOfStock}
        variant="primary"
        icon={
          outOfStock ? null : <Icon name="ShoppingCart" color="secondary" />
        }
        onClick={() => {
          addItem({
            itemOffered: {
              ...product,
              isVariantOf: {
                ...product.isVariantOf,
                skuVariants: {
                  activeVariations: [],
                  availableVariations: [],
                  slugsMap: {},
                },
              },
            },
            quantity: 1,
            seller: { ...seller },
            listPrice: listPrice,
            price: spotPrice,
          } as unknown as Omit<CartItem, 'id'>)
          toggleCart()
        }}
      >
        {outOfStock ? 'Unavailable' : 'Add to cart'}
      </BuyButton>
    </UIProductCard>
  )
}

export default memo(CustomProductCard)
