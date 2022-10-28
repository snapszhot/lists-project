import PropTypes from 'prop-types'
import useRouteChange from '@lib/use-route-change'
import { BarLoader } from '@components/common'

import '../styles/globals.scss'

export default function MyApp({ Component, pageProps }) {
    const { routeChanging } = useRouteChange()

    return (
        <>
            {routeChanging && <BarLoader />}
            <Component {...pageProps} />
        </>
    )
}

MyApp.propTypes = {
    Component: PropTypes.func,
    pageProps: PropTypes.object,
}
