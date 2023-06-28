import './globals.scss';
import { Fira_Sans } from 'next/font/google';
import Footer from './layout/Footer/Footer';
import { Metadata } from 'next';

const firaSans = Fira_Sans({
    subsets: ['latin'],
    style: ['normal', 'italic'],
    weight: ['400', '700'],
});

export const metadata: Metadata = {
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
            <body className={firaSans.className}>
                {children}
                <Footer />
            </body>
        </html>
    );
}
