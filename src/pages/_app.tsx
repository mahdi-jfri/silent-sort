import type { AppProps } from 'next/app';
import './globals.css';
import {Geist, Geist_Mono} from "next/font/google";
import {Metadata} from "next";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Silent Sort",
    description: "A collaborative card sorting game.",
};

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <main className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <Component {...pageProps} />
        </main>
    );
}

export default MyApp;