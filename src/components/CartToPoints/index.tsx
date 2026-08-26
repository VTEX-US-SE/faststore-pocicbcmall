import React, { useEffect } from 'react'
import { cartStore_unstable as useCart } from '@faststore/core/experimental'
import { usePriceFormatter } from '../common/custom-hooks'
import { usePointsFormatter } from '../common/custom-hooks/usePointsFormatter'

function CartToPoints() {
  const pointsFormatter = usePointsFormatter()
  const priceFormatter = usePriceFormatter()
  const pixelHelpers = {
    observer({
      targetSelector,
      mutationTargetClass,
      callback,
      disconnect = false,
      stop = true,
      options = { childList: true, characterData: true, subtree: true },
    }: any) {
      if (typeof targetSelector !== 'string')
        throw Error('targetSelector is not a string value')
      if (typeof mutationTargetClass !== 'string')
        throw Error('mutationTargetClass is not a string value')
      if (typeof callback !== 'function')
        throw Error('callback is not a function')

      if ('MutationObserver' in window) {
        const target = document.querySelector(targetSelector)
        if (target) {
          const existingNode = target.querySelector(mutationTargetClass)
          if (existingNode) {
            callback()
            if (stop) return
          }

          const observer = new MutationObserver(function (mutations) {
            for (const mutation of mutations) {
              const mutationNodes = Array.from(mutation.addedNodes)
              for (const node of mutationNodes) {
                if (!(node instanceof HTMLElement)) continue
                if (
                  node.matches?.(mutationTargetClass) ||
                  node.querySelector?.(mutationTargetClass)
                ) {
                  callback()
                  if (disconnect) observer.disconnect()
                  if (stop) return
                }
              }
            }
          })

          observer.observe(target, options)
        } else {
          throw Error('target is not defined')
        }
      } else {
        throw Error('MutationObserver is not supported')
      }
    },
  }

  const formatValueText = (cash: number, points: number) => {
    const cashText = cash > 0 ? priceFormatter(cash) : ''
    const pointsText = points > 0 ? pointsFormatter(Math.round(points)) : ''
    const separator = cash > 0 && points > 0 ? ' + ' : ''
    return `${pointsText}${separator}${cashText}`
  }

  const getItemPointsAndCash: any = (item: any, cpp: any, percentage: any) => {
    const value = item.price
    const cashInPoints = value * (percentage / 100)
    const cashPart = value - cashInPoints
    const pointsPart = cashInPoints / cpp

    return { cash: cashPart, points: pointsPart }
  }

  const processItemCard = (
    itemCard: any,
    percentage: any,
    cpp: any,
    itemInfo: any
  ): any => {
    const priceWrapper = itemCard.querySelector('div[data-fs-product-price]')
    const priceSpan = priceWrapper?.querySelector('span[data-fs-price]')

    if (!priceSpan || !priceSpan.textContent) return

    const { cash, points } = getItemPointsAndCash(itemInfo, cpp, percentage)

    const formattedValue = formatValueText(cash, points)
    priceSpan.innerText = formattedValue

    return { cash, points }
  }

  const processCartSummary = (totalPoints: any, totalCash: any) => {
    const summaryTotal = document.querySelector(
      '[data-fs-order-summary-total-value]'
    )
    const summaryTotalFormatted = formatValueText(totalCash, totalPoints)

    if (summaryTotal) {
      summaryTotal.innerHTML = summaryTotalFormatted
    }
  }

  const { read } = useCart

  useEffect(() => {
    pixelHelpers.observer({
      targetSelector: 'body',
      mutationTargetClass: '[data-fs-cart-item]',
      callback: () => {
        const cartInfo = read()
        const itemCards = Array.from(
          document.querySelectorAll('[data-fs-cart-item]')
        )
        const { items: itemsInfo } = cartInfo
        var totalPoints = 0
        var totalCash = 0

        itemCards.forEach((itemCard, idx) => {
          const itemInfo = itemsInfo[idx] as any
          const attachment = itemInfo.itemOffered.additionalProperty.find(
            (additionalProperty: any) =>
              additionalProperty.name === 'Points Conversion Information'
          ).value
          const attachmentValues = JSON.parse(attachment).points.split('|')
          const percentageOfTheValueInPoints = attachmentValues[0]
          const cpp = attachmentValues[1]

          const { cash, points } = processItemCard(
            itemCard,
            percentageOfTheValueInPoints,
            cpp,
            itemInfo
          )

          totalPoints += points
          totalCash += cash
        })

        processCartSummary(totalPoints, totalCash)
      },
    })
  }, [pointsFormatter, priceFormatter])

  return <div data-fs-cart-custom />
}

export default CartToPoints
