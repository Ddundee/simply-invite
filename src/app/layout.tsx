import "~/styles/globals.css";
import localFont from 'next/font/local'
import { type Metadata } from "next";
import { PHProvider } from './providers'
import dynamic from 'next/dynamic'

const PostHogPageView = dynamic(() => import('./PostHogPageView'), {
    ssr: false,
})

export const metadata: Metadata = {
    title: "Simply Invite",
    description: "A invitation generation service.",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

// Font files can be colocated inside of `pages`
const swizter = localFont({ src: './_fonts/Switzer-Variable.ttf' })
// const swizterItalic = localFont({ src: './_fonts/Switzer-VariableItalic.ttf' })



export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${swizter.className} scroll-smooth`}>
            <PHProvider>
                <body className="bg-primary-bg text-primary-text [&>*]:px-32">
                    <PostHogPageView />
                    {children}
                </body>
            </PHProvider>
        </html>
    );
}
