export function daysSince(dateStr: string): number {
  const date = new Date(`${dateStr}T00:00:00`)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
}

export function formatHaceDias(days: number): string {
  if (days <= 0) return 'hoy'
  if (days === 1) return 'hace 1 día'
  return `hace ${days} días`
}

export function formatFecha(dateStr: string): string {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
