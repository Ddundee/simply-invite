import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "~/components/ui/accordion";

export default function Page() {
    const faqs = [
        {
            question: "How does the invitation process work with your service?",
            answer: "Our process is simple! Once you create an event, you can upload a custom invitation letter, which we turn into a shareable link. You have the option to distribute this link on your own, or, for a small fee, you can let us handle the delivery via text message and email to your guest list. You'll also have access to event tracking to see who has responded.",
        },
        {
            question: "Is this a subscription service?",
            answer: "No, we operate on a one-time payment model. You pay a small fee based on the number of recipients you choose to invite, so there’s no need to worry about recurring charges. This gives you a flexible, commitment-free way to manage invitations as needed.",
        },
        {
            question: "Can I customize the invitations?",
            answer: "Absolutely! You can upload your own custom invitation letter, which can include any style, format, or message you want. We’ll make it shareable and easy for your guests to access via link, email, or SMS.",
        },
        {
            question: "How do I know if my guests received their invitations?",
            answer: "Our platform includes event status tracking, allowing you to monitor delivery and RSVP status in real-time. You’ll be able to see who has opened, accepted, or declined the invitation, making it easy to keep tabs on attendance.",
        },
        {
            question: "Do you offer bulk pricing for large events?",
            answer: "Yes, we offer custom pricing for large events hosting 1,000+ guests. If you’re planning a big event, please contact us to discuss a tailored plan that meets your needs, complete with additional delivery options and tracking tools.",
        },
    ];

    return (
        <>
            <div
                className="flex flex-col items-center justify-center space-y-9"
                id="hero"
            >
                <div className="flex flex-col items-center justify-center gap-3">
                    <h1 className="bg-gradient-to-r from-primary to-[#1811d7]/70 bg-clip-text text-center text-4xl font-bold leading-tight text-transparent md:text-5xl md:leading-tight">
                        Your design, our delivery.
                        <br /> Invites made simple.
                    </h1>
                    <p className="text-secondary-text w-fit max-w-lg text-center leading-normal">
                        An easy, dirt cheap way to share your event invitations.
                        Upload your custom design, get a shareable link. And
                        then party time 🥳.
                    </p>
                </div>
                <div className="flex gap-3">
                    <SignedOut>
                        <SignUpButton
                            signInFallbackRedirectUrl={"/dashboard"}
                            fallbackRedirectUrl={"/dashboard"}
                        >
                            <Button className="flex gap-3 fade-in">
                                Invite Now <ArrowRightIcon />
                            </Button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <Link
                            href="/dashboard/events/new"
                            className={cn(buttonVariants(), "fade-in")}
                            passHref
                        >
                            Invite Now <ArrowRightIcon />
                        </Link>
                    </SignedIn>
                </div>
            </div>
            <div className="space-y-9" id="how-it-works">
                <h2 className="text-2xl font-medium">How it works</h2>
                <div className="grid gap-6 lg:grid-cols-3">
                    <Card className="bg-secondary">
                        <CardHeader>
                            <CardTitle>
                                1. Upload Your Invitation Design
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-secondary-foreground/60">
                                Already have a design? Perfect! Just upload your
                                custom invitation in seconds. If you don’t have
                                one, it’s ok!
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-secondary">
                        <CardHeader>
                            <CardTitle>2. Share Your Invitation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-secondary-foreground/60">
                                Once your invite is uploaded, we’ll create a
                                unique link that you can easily share with
                                friends, family, or colleagues. Send it directly
                                yourself, or choose our optional delivery
                                service, and we’ll handle the emailing or
                                texting to each guest on your behalf.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-secondary">
                        <CardHeader>
                            <CardTitle>3. Track and Manage Responses</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-secondary-foreground/60">
                                Easily see who’s viewed your invite and who’s
                                responded. Stay organized and keep track of your
                                event all in one place.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="space-y-9" id="faqs">
                <h2 className="text-2xl font-medium">FAQs</h2>
                <div className="">
                    <Accordion type="single" collapsible>
                        {faqs.map(({ question, answer }, index) => (
                            <AccordionItem key={index} value={`${index}`}>
                                <AccordionTrigger>{question}</AccordionTrigger>
                                <AccordionContent className="text-secondary-foreground/60">
                                    {answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </>
    );
}
