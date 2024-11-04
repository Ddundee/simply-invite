import React from "react";
import { Footer, Nav } from "../page";
import ContactForm from "../_components/contactForm";

export default function Page() {
    return (
        <>
            <Nav />
            <main className="my-32 space-y-9 px-32">
                <h2>Contact us</h2>
                <ContactForm />
            </main>
            <Footer />
        </>
    );
}
