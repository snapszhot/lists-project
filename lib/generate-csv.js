import { parseAsync } from 'json2csv'

export default async function generateCsv(fields, rows) {
    return await parseAsync(rows, { fields, withBOM: true })
}
