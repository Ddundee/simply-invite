import { Separator } from "@radix-ui/react-separator";
import { SignUpButton } from "@clerk/nextjs";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "../_components/button";
import Card from "../_components/card";
import FAQs from "../_components/faqs";

export default function Page() {
    return (
        <>
            <div
                className="flex flex-col items-center justify-center space-y-9"
                id="hero"
            >
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-center text-4xl font-bold md:text-5xl">
                        Your design, our delivery.
                        <br /> Invites made simple.
                    </h1>
                    <p className="max-w-lg text-center text-secondary-text">
                        An easy, dirt cheap way to share your event invitations.
                        Upload your custom design, get a shareable link. And
                        then party time 🥳.
                    </p>
                </div>
                <SignUpButton
                    signInFallbackRedirectUrl={"/dashboard"}
                    fallbackRedirectUrl={"/dashboard"}
                >
                    <Button className="fade-in">
                        Invite Now <ArrowRightIcon />
                    </Button>
                </SignUpButton>
            </div>

            <div className="space-y-9">
                <h2 className="text-center text-2xl font-medium">
                    People love us
                </h2>
                <div className="flex flex-col items-center justify-center md:flex-row md:gap-12">
                    <div className="flex flex-col items-center gap-3">
                        <h3 className="text-5xl font-semibold text-blue">
                            {0}
                        </h3>
                        <p className="text-nowrap text-secondary-text">
                            Events Created
                        </p>
                    </div>
                    <Separator
                        className="invisible h-20 w-px bg-outline md:block"
                        orientation="vertical"
                    />
                    <div className="flex flex-col items-center gap-3">
                        <h3 className="text-5xl font-semibold text-blue">
                            {0}
                        </h3>
                        <p className="text-secondary-text">Users</p>
                    </div>
                    <Separator
                        className="invisible h-20 w-px bg-outline md:block"
                        orientation="vertical"
                    />
                    <div className="flex flex-col items-center gap-3">
                        <h3 className="text-5xl font-semibold text-blue">
                            {100}%
                        </h3>
                        <p className="text-nowrap text-secondary-text">
                            Satisfaction rate (by me)
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-9" id="how-it-works">
                <h2 className="text-2xl font-medium">How it works</h2>
                <div className="grid gap-6 lg:grid-cols-3">
                    <Card title="1. Upload Your Invitation Design">
                        <p className="text-secondary-text">
                            Already have a design? Perfect! Just upload your
                            custom invitation in seconds. If you don’t have one,
                            it’s ok!
                        </p>
                    </Card>
                    <Card title="2. Share Your Invitation">
                        <p className="text-secondary-text">
                            Once your invite is uploaded, we’ll create a unique
                            link that you can easily share with friends, family,
                            or colleagues. Send it directly yourself, or choose
                            our optional delivery service, and we’ll handle the
                            emailing or texting to each guest on your behalf.
                        </p>
                    </Card>
                    <Card title="3. Track and Manage Responses">
                        <p className="text-secondary-text">
                            Easily see who’s viewed your invite and who’s
                            responded. Stay organized and keep track of your
                            event all in one place.
                        </p>
                    </Card>
                </div>
            </div>

            {/* <Pricing /> */}

            <FAQs />
        </>
    );
}

Page.layoutProps = {
    className: "space-y-32",
};
