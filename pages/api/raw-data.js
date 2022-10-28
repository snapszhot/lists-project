import generateCsv from '@lib/generate-csv'
import getFilmTitle from '@lib/get-film-title'
import getPollResults from '@lib/get-poll-results'

function getCsvHeaders(ballots) {
    const headers = ['title', 'director']

    ballots.forEach(({ username }) => {
        headers.push(username)
    })

    return headers
}

function getCsvRows(ballots) {
    const rows = {}

    ballots.forEach(({ lp_ballot_item, username }) => {
        lp_ballot_item.forEach(({ prefills, rank }) => {
            const title = getFilmTitle(prefills)
            rows[title] = {
                ...rows[title],
                title,
                director: prefills.director,
                [username]: rank,
            }
        })
    })

    const rowsArray = Object.values(rows)
    rowsArray.sort((a, b) => a.title.localeCompare(b.title))

    return rowsArray
}

async function compileCsv(ballots) {
    const fields = getCsvHeaders(ballots)
    const rows = getCsvRows(ballots)

    return await generateCsv(fields, rows)
}

export default async function handler(req, res) {
    try {
        const ballots = await getPollResults(req.body.poll_id)
        const csv = await compileCsv(ballots)

        res.setHeader('Content-disposition', 'attachment; filename=data.csv')
        res.setHeader('Content-Type', 'text/csv')
        res.status(200).send(csv)
    } catch (error) {
        console.log('Error generating raw data', error) // eslint-disable-line no-console

        res.status(500).json({ error: 'Error generating raw data csv' })
    }
}
