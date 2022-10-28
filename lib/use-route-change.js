import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const useRouteChange = () => {
    const router = useRouter()
    const [routeChanging, setRouteChanging] = useState(false)

    const handleRouteChangeComplete = () => setRouteChanging(false)
    const handleRouteChangeStart = () => setRouteChanging(true)

    useEffect(() => {
        router.events.on('routeChangeComplete', handleRouteChangeComplete)
        router.events.on('routeChangeStart', handleRouteChangeStart)

        return () => {
            router.events.off('routeChangeComplete', handleRouteChangeComplete)
            router.events.off('routeChangeStart', handleRouteChangeStart)
        }
    }, [router])

    return { routeChanging }
}

export default useRouteChange
