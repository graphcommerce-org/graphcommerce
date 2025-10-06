type Revalidate = 'minutes' | 'hours' | 'days'

export function revalidate(frequency: Revalidate = 'minutes') {
  switch (frequency) {
    case 'days':
      return 60 * 60 * 24 * 20
    case 'hours':
      return 60 * 60 * 20
    case 'minutes':
    default:
      return 60 * 20
  }
}
