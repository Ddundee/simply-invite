import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "~/components/ui/accordion";

export default function FAQs() {
    const faqs = [
        {
            question: "How does the invitation process work with your service?",
            answer: "Our process is simple! Once you create an event, you can upload a custom invitation letter, which we turn into a shareable link. You have the option to distribute this link on your own, or, for a small fee, you can let us handle the delivery via text message and email to your guest list. You'll also have access to event tracking to see who has responded."
        },
        {
            question: "Is this a subscription service?",
            answer: "No, we operate on a one-time payment model. You pay a small fee based on the number of recipients you choose to invite, so there’s no need to worry about recurring charges. This gives you a flexible, commitment-free way to manage invitations as needed."
        },
        {
            question: "Can I customize the invitations?",
            answer: "Absolutely! You can upload your own custom invitation letter, which can include any style, format, or message you want. We’ll make it shareable and easy for your guests to access via link, email, or SMS."
        },
        {
            question: "How do I know if my guests received their invitations?",
            answer: "Our platform includes event status tracking, allowing you to monitor delivery and RSVP status in real-time. You’ll be able to see who has opened, accepted, or declined the invitation, making it easy to keep tabs on attendance."
        },
        {
            question: "Do you offer bulk pricing for large events?",
            answer: "Yes, we offer custom pricing for large events hosting 1,000+ guests. If you’re planning a big event, please contact us to discuss a tailored plan that meets your needs, complete with additional delivery options and tracking tools."
        }
    ]

    return (
        <div className="space-y-9" id="faqs">
            <h2 className="text-2xl font-medium">FAQs</h2>
            <div className="">
                <Accordion type="single" collapsible>
                    {faqs.map(({ question, answer }, index) => (
                        <AccordionItem key={index} value={`${index}`}>
                            <AccordionTrigger>{question}</AccordionTrigger>
                            <AccordionContent>{answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}