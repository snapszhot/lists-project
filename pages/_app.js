import PropTypes from 'prop-types'

import '../styles/globals.scss'

export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

MyApp.propTypes = {
    Component: PropTypes.func,
    pageProps: PropTypes.object,
}
