import Document, {Html, Head, Main, NextScript} from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return {...initialProps};
    }

    render() {
        return (
            <Html>
                <Head>
                    <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=[Tracking ID]"
                    />

                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '[G-11PW7ZWW0J]', { page_path: window.location.pathname });
            `,
                        }}
                    />
                    <body>
                    <Main/>
                    <NextScript/>
                    </body>
                </Head>
            </Html>
        );
    }
}

export default MyDocument;
