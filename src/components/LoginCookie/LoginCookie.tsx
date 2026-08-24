import React, { useEffect } from 'react'
import { useCookieByDocument } from '../common/custom-hooks/useCookieByDocument'

const CheckAndUpdateCookie: React.FC = () => {
  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null
    return null
  }

  const setCookie = (name: string, value: string): void => {
    document.cookie = `${name}=${value}; path=/;`
  }

  const { data, isLoading } = useCookieByDocument()

  useEffect(() => {
    if (!isLoading && data?.getCookieByDocument) {
      const apiValue = data.getCookieByDocument.token
      const currentCookieValue = getCookie(
        'VtexIdclientAutCookie_pocicbcmall'
      )

      if (currentCookieValue !== apiValue && apiValue) {
        setCookie('VtexIdclientAutCookie_pocicbcmall', apiValue)
        window.location.reload()
      }
    }
  }, [data, isLoading])

  return <div />
}

export default CheckAndUpdateCookie
