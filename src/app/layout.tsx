import './globals.scss';
import { Fira_Sans } from 'next/font/google';
import Footer from './layout/Footer/Footer';
import Head from 'next/head';

const firaSans = Fira_Sans({
    subsets: ['latin'],
    style: ['normal', 'italic'],
    weight: ['400', '700'],
});

const metadata = {
    title: 'CHI IT Test Task',
    description: 'Table with cars list',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <Head>
                <meta charSet="utf-8" />
                <meta
                    name="description"
                    content={metadata.description}
                />
                <meta
                    name="viewport"
                    content="width=device-width"
                />
                <title>{metadata.title}</title>
                <link
                    rel="shortcut icon"
                    href="/favicon.ico"
                />
            </Head>
            <body className={firaSans.className}>
                {children}
                <Footer />
            </body>
        </html>
    );
}
