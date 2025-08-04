export const formatFileSize = (bytes: number) =>
  new Intl.NumberFormat('en', {
    notation: 'compact',
    style: 'unit',
    unit: 'byte',
    unitDisplay: 'narrow',
  }).format(bytes)
