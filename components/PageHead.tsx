import Head from 'next/head'

const PageHead = () => {
    return (
        <Head>
            <meta name="description" content="Mark's Personal Portfolio"/>
            <meta name="author" content="Mark Jesper Pillerva"/>
            <meta name="keywords" content="Next,React,JavaScript,Mark's Portfolio,White Cat Dev,Portfolio"/>
            <meta name="creator" content="Mark Jesper Pillerva"/>
            <meta name="theme-color" content="#262320"/>
            <link rel="icon" href="/favicon.ico"/>
            <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>

            <link rel="canonical" href="https://whitecatdev.vercel.app/"/>
            <link rel="alternate" hrefLang="en-US" href="https://whitecatdev.vercel.app/en-US"/>
            <link rel="alternate" hrefLang="fr-CA" href="https://whitecatdev.vercel.app/fr-CA"/>

            <meta property="og:title" content="White Cat Dev"/>
            <meta property="og:description" content="Mark's Personal Portfolio"/>
            <meta property="og:url" content="https://mark123jesper.vercel.app/"/>
            <meta property="og:site_name" content="White Cat Dev"/>
            <meta property="og:locale" content="en_US"/>
            <meta property="og:image" content="/android-chrome-512x512.png"/>
            <meta property="og:type" content="website"/>

            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:creator" content="Mark Jesper Pillerva"/>
            <meta name="twitter:title" content="White Cat Dev"/>
            <meta name="twitter:description" content="Mark's Personal Portfolio"/>
            <meta name="twitter:image" content="/android-chrome-512x512.png"/>

            <link rel="manifest" href="/manifest.json"/>

            <title>White Cat Dev</title>
        </Head>
    );
};

export default PageHead;
