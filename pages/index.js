import { Poll } from '@components/views'

export default function HomePage(props) {
    return <Poll {...props} />
}

export async function getStaticProps({ preview = false }) {
    return {
        props: {
            preview,
        },
        revalidate: 60,
    }
}
