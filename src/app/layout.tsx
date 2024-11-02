import "~/styles/globals.css";
import localFont from 'next/font/local'
import { type Metadata } from "next";
import dynamic from 'next/dynamic'
import { ClerkProvider } from "@clerk/nextjs";
import { CSPostHogProvider } from "./providers";


export const metadata: Metadata = {
    title: "Simply Invite",
    description: "A invitation generation service.",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const swizter = localFont({ src: './_fonts/Switzer-Variable.ttf' })
// const swizterItalic = localFont({ src: './_fonts/Switzer-VariableItalic.ttf' })



export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <ClerkProvider>
            <CSPostHogProvider>
                <html lang="en" className={`${swizter.className} scroll-smooth`}>
                    <body className="bg-primary-bg text-primary-text [&>*]:px-32">
                        {children}
                    </body>
                </html>
            </CSPostHogProvider>
        </ClerkProvider>
    );
}
