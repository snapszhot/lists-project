import { captureException } from '@sentry/nextjs'
import generateCsv from '@lib/generate-csv'
import getFilmTitle from '@lib/get-film-title'
import getPollResults from '@lib/get-poll-results'

function getCsvRows(ballots) {
    const rows = {}

    ballots.forEach(({ lp_ballot_item }) => {
        lp_ballot_item.forEach(({ prefills, rank }) => {
            const title = getFilmTitle(prefills)

            const existingPoints = rows[title]?.points || 0
            const points = existingPoints + (26 - parseInt(rank))

            const existingVotes = rows[title]?.votes || 0
            const votes = existingVotes + 1

            const score = votes <= 1 ? 0 : points

            const existingTopFivePlacements =
                rows[title]?.top_five_placements || 0
            const isInTopFive = rank <= 5 ? 1 : 0
            const top_five_placements = existingTopFivePlacements + isInTopFive

            const existingHighestRanking = rows[title]?.highest_ranking || rank
            const highest_ranking =
                rank < existingHighestRanking ? rank : existingHighestRanking

            const existingHighestRankingMultiples =
                rows[title]?.highest_ranking_multiples || 0
            const highest_ranking_multiples =
                rank === existingHighestRanking
                    ? existingHighestRankingMultiples + 1
                    : 1

            rows[title] = {
                director: prefills.director,
                highest_ranking,
                highest_ranking_multiples,
                points,
                score,
                title,
                top_five_placements,
                votes,
            }
        })
    })

    const rowsArray = Object.values(rows)
    rowsArray.sort((a, b) => {
        if (a.points < b.points) {
            return 1
        }

        if (a.points > b.points) {
            return -1
        }

        return 0
    })

    return rowsArray
}

async function compileCsv(ballots) {
    const fields = [
        'title',
        'director',
        'points',
        'score',
        'votes',
        'top_five_placements',
        'highest_ranking',
        'highest_ranking_multiples',
    ]
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
        captureException(error)

        res.status(500).json({ error: 'Error generating raw data csv' })
    }
}
