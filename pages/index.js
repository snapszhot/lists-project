import path from 'path'
import getPrefills from '@lib/get-prefills'

import { Poll } from '@components/views'

export default function HomePage(props) {
    return <Poll {...props} />
}

export async function getStaticProps({ preview = false }) {
    // We have to load this file within getStaticProps itself because of some weird
    // Next.js requirement. See https://github.com/vercel/next.js/discussions/32236#discussioncomment-3202094
    const dataPath = path.join(
        process.cwd(),
        'public/prefills/1columncsv9-10-22.csv'
    )
    const [prefills] = await Promise.all([getPrefills(dataPath)])

    return {
        props: {
            prefills,
            preview,
        },
        revalidate: 60,
    }
}
