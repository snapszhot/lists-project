import { FourOhFour } from '@components/views'

export default function FourOhFourPage(props) {
    return <FourOhFour {...props} />
}

export async function getStaticProps() {
    return {
        props: {
            pageTitle: '404! Page Not Found!',
        },
        revalidate: 120,
    }
}
