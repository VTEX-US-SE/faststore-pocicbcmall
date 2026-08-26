import { useState } from 'react'
import styles from './customproductpoints.module.scss'
import { usePDP } from '@faststore/core'
import { useSession_unstable as useSession } from '@faststore/core/experimental'
import InputMask from 'react-input-mask'

export default function CustomProductPoints() {
  const { data: dataProduct } = usePDP()
  const { locale } = useSession()
  const price = Number(dataProduct?.product?.offers?.offers?.[0]?.price ?? 0)
  //@ts-ignore
  const cpp = Number(dataProduct?.product?.cpp ?? 100)
  const points = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(price / cpp)
  const [cuit, setCuit] = useState('')
  const [error, setError] = useState('')
  const [agreed, setAgreed] = useState(false)
  const onlyNumbers = cuit.replace(/\D/g, '')
  const isCuitValid = onlyNumbers.length === 11 && error === ''
  const canProceed = isCuitValid && agreed

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCuit(value)

    const onlyNumbers = value.replace(/\D/g, '')

    if (onlyNumbers.length !== 11) {
      setError('Invalid CUIT/CUIL')
    } else {
      setError('')
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{dataProduct?.product?.seo?.title}</h1>

      <div>
        <div className={styles.banner}>
          <img src={dataProduct?.product?.image[0]?.url} alt="Banner" />
        </div>

        <div className={styles.pointsBox}>
          <span className={styles.smallText}>Up to</span>
          <span className={styles.bigNumber}>{points}</span>
          <div className={styles.pointsText}>
            <span className={styles.highlightText}>Points</span>
            <span className={styles.text}>ICBC Puntos*</span>
          </div>
          <span className={styles.smallText}>for every</span>
          <span className={styles.bigNumber}>1</span>
          <div className={styles.pointsText}>
            <span className={styles.highlightText}>
              unit <span>spent</span>
            </span>
            <span className={styles.text}>on purchase</span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <p className={styles.description}>
          To use this benefit,{' '}
          <span className={styles.link}>sign in to your ICBC Puntos account</span> or
        </p>

        <div className={styles.wrapper}>
          <InputMask
            mask="99-99999999-9"
            value={cuit}
            onChange={handleChange}
            className={`${styles.input} ${error ? styles.errorBorder : ''}`}
            placeholder="Enter CUIT/CUIL"
          />
          {error && <p className={styles.errorText}>{error}</p>}
        </div>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label htmlFor="agree">
            I agree that this data is being stored for the purpose of
            accumulating ICBC Puntos.
          </label>
        </div>

        {!canProceed ? (
          <button className={styles.partnerButton} disabled={!canProceed}>
            Go to partner website
          </button>
        ) : (
          <a
            className={`${styles.partnerButton}`}
            href={dataProduct?.product?.redirectUrl}
            target="_blank"
            role="button"
            rel="noreferrer"
          >
            Go to partner website
          </a>
        )}
      </div>
    </div>
  )
}
