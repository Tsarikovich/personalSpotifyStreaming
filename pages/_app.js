import '../styles/globals.css';
import { useRouter } from 'next/router';
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {

    const router = useRouter();

    const handleRouteChange = (url) => {
        window.gtag('config', 'G-11PW7ZWW0J', {
            page_path: url,
        });
    };

    useEffect(() => {
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);


    return (
        <>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
