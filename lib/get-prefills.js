import fs from 'fs'
import { parse } from 'csv-parse'
import normalizeString from '@lib/normalize-string'

export default async function getPrefills(dataPath) {
    return new Promise(res => {
        const results = []

        fs.createReadStream(dataPath, { encoding: 'utf-8' })
            .pipe(
                parse({
                    bom: true,
                    columns: true,
                })
            )
            .on('data', data =>
                results.push({
                    director: data.director,
                    directorNorm: normalizeString(data.director),
                    movie: data.title,
                    movieNorm: normalizeString(data.title),
                    releaseYear: data.year,
                    originalTitle: data?.originalTitle || '',
                    originalTitleNorm: normalizeString(
                        data?.originalTitle || ''
                    ),
                })
            )
            .on('end', () => {
                results.sort((a, b) => {
                    const movieA = a.movie.toLowerCase()
                    const movieB = b.movie.toLowerCase()

                    if (movieA < movieB) {
                        return -1
                    }

                    if (movieA > movieB) {
                        return 1
                    }

                    return 0
                })

                res(results)
            })
            .on('error', err => res.end(err))
    })
}
