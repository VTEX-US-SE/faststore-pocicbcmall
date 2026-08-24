import Property from '../types/property'

const getProductFlags = (properties: Property[] | undefined) => {
  const activeFlags: string[] = []
  properties?.forEach((spec) => {
    if (
      spec.name.toLowerCase() === 'condición del ítem' &&
      spec.values[0].toLowerCase() === 'usado'
    ) {
      activeFlags.push('usado')
    }
    if (
      spec.name.toLowerCase() === 'producto internacional' &&
      spec.values[0].toLowerCase() === 'sí'
    ) {
      activeFlags.push('internacional')
    }
  })
  return activeFlags
}

export default getProductFlags
