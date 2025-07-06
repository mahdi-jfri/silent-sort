import {Html, Head, Main, NextScript} from 'next/document';
import nextConfig from '../../next.config';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta name="description" content="A collaborative card sorting game."/>
                <link rel="icon" href={`${nextConfig.basePath || ""}/favicon.ico`}/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}