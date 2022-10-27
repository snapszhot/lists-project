import { parseAsync } from 'json2csv'
import supabase from '@lib/supabase-client'

function getCsvHeaders(ballots) {
    const headers = ['title', 'director']

    ballots.forEach(({ username }) => {
        headers.push(username)
    })

    return headers
}

function getFilmTitle({
    alt_eng_title,
    alt_lang_title,
    eng_trans_title,
    orig_lang_title,
    phonetic_alt,
    phonetic_orig,
}) {
    let title = orig_lang_title

    if (phonetic_orig) {
        title += ` [${phonetic_orig}]`
    }
    if (alt_lang_title) {
        title += ` [${alt_lang_title}]`
    }
    if (phonetic_alt) {
        title += ` [${phonetic_alt}]`
    }
    if (eng_trans_title) {
        title += ` [${eng_trans_title}]`
    }
    if (alt_eng_title) {
        title += ` [${alt_eng_title}]`
    }

    return title
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

async function generateCsv(ballots) {
    const fields = getCsvHeaders(ballots)
    const rows = getCsvRows(ballots)

    return await parseAsync(rows, { fields, withBOM: true })
}

async function getResults(poll_id) {
    const { data, error } = await supabase
        .from('lp_ballots')
        .select(
            `*,
            lp_ballot_item(
                *,
                prefills( * )
            )`
        )
        .eq('poll_id', poll_id)

    if (error) {
        throw error
    }

    return data
}

export default async function handler(req, res) {
    try {
        const ballots = await getResults(req.body.poll_id)
        const csv = await generateCsv(ballots)

        res.setHeader('Content-disposition', 'attachment; filename=data.csv')
        res.setHeader('Content-Type', 'text/csv')
        res.status(200).send(csv)
    } catch (error) {
        console.log('Error generating raw data', error) // eslint-disable-line no-console

        res.status(500).json({ error: 'Error generating raw data csv' })
    }
}
