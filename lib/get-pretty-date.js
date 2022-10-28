import { DateTime } from 'luxon'

export default function getPrettyDate(date) {
    const dt = DateTime.fromISO(date)

    return dt.toLocaleString({ month: 'long', day: 'numeric' })
}
