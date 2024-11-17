import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuLinkItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import { cn } from "~/lib/utils";
import { Button, ButtonGroup } from "./_components/button";
import { Separator } from "@radix-ui/react-separator";
import Card from "./_components/card";
import FAQs from "./_components/faqs";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
} from "@clerk/nextjs";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default function Page() {
    return (
        <>
            <Nav />
            <main className="my-32 space-y-32 md:px-32 max-w-screen-xl mx-auto">
                <div
                    className="flex flex-col items-center justify-center space-y-9"
                    id="hero"
                >
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-center md:text-5xl text-4xl font-bold">
                            Your design, our delivery.
                            <br /> Invites made simple.
                        </h1>
                        <p className="text-center text-secondary-text max-w-lg">
                            An easy, dirt cheap way to share your event
                            invitations. Upload your
                            custom design, get a shareable link. And then
                            party time 🥳.
                        </p>
                    </div>
                    <SignUpButton>
                        <Button>
                            Invite Now <ArrowRightIcon />
                        </Button>
                    </SignUpButton>
                </div>

                <div className="space-y-9">
                    <h2 className="text-center text-2xl font-medium">
                        People love us
                    </h2>
                    <div className="flex items-center justify-center md:gap-12 gap-6">
                        <div className="flex flex-col items-center gap-3">
                            <h3 className="text-5xl font-semibold text-blue">
                                {0}
                            </h3>
                            <p className="text-secondary-text text-nowrap">
                                Events Created
                            </p>
                        </div>
                        <Separator
                            className="h-20 w-px bg-outline invisible md:block"
                            orientation="vertical"
                        />
                        <div className="flex flex-col items-center gap-3">
                            <h3 className="text-5xl font-semibold text-blue">
                                {0}
                            </h3>
                            <p className="text-secondary-text">Users</p>
                        </div>
                        <Separator
                            className="h-20 w-px bg-outline invisible md:block"
                            orientation="vertical"
                        />
                        <div className="flex flex-col items-center gap-3">
                            <h3 className="text-5xl font-semibold text-blue">
                                {100}%
                            </h3>
                            <p className="text-secondary-text text-nowrap">
                                Satisfaction rate (by me)
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-9" id="how-it-works">
                    <h2 className="text-2xl font-medium">How it works</h2>
                    <div className="grid grid-cols-3 gap-6">
                        <Card title="1. Upload Your Invitation Design">
                            <p className="text-secondary-text">
                                Already have a design? Perfect! Just upload your
                                custom invitation in seconds. If you don’t have
                                one, it’s ok!
                            </p>
                        </Card>
                        <Card title="2. Share Your Invitation">
                            <p className="text-secondary-text">
                                Once your invite is uploaded, we’ll create a
                                unique link that you can easily share with
                                friends, family, or colleagues. Send it directly
                                yourself, or choose our optional delivery
                                service, and we’ll handle the emailing or
                                texting to each guest on your behalf.
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
            </main>
            <Footer />
        </>
    );
}

export function Nav() {
    return (
        <nav
            className="flex justify-between border-b border-outline px-32 py-6"
            id="nav"
        >
            <div className="flex items-center justify-between gap-12 max-w-screen-xl">
                <Link href={"/"} className="text-lg font-semibold text-blue">
                    Simply Invite
                </Link>
                <NavigationMenu>
                    <NavigationMenuList className="space-x-1">
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                Resources
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid p-4 md:w-[400px] lg:w-max lg:grid-cols-[1fr]">
                                    <NavigationMenuLinkItem href="/#how-it-works">
                                        How it works
                                    </NavigationMenuLinkItem>
                                    <NavigationMenuLinkItem href="/#request-features">
                                        Request Features
                                    </NavigationMenuLinkItem>
                                    <NavigationMenuLinkItem href="/#faqs">
                                        FAQs
                                    </NavigationMenuLinkItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        {/* <NavigationMenuItem>
                            <Link href="/#pricing" legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={cn(
                                        "block rounded-md p-3 text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                    )}
                                >
                                    Pricing
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem> */}
                        <NavigationMenuItem>
                            <Link href="/contact" legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={cn(
                                        "block rounded-md p-3 text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                    )}
                                >
                                    Contact us
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="flex gap-3">
                <SignedOut>
                    <ButtonGroup>
                        <SignInButton>Sign in</SignInButton>
                        <SignUpButton>Sign up</SignUpButton>
                    </ButtonGroup>
                    <SignUpButton>
                        <Button>
                            Invite Now <ArrowRightIcon />
                        </Button>
                    </SignUpButton>
                </SignedOut>
                <SignedIn>
                    <Button variant="secondary">
                        <Link href={"/dashboard"}>Dashboard</Link>
                    </Button>
                    <UserButton
                        appearance={{
                            elements: { userButtonAvatarBox: "w-10 h-10" },
                        }}
                    />
                </SignedIn>
                {/* <Button>
                    Invite Now
                    <ArrowLeft />
                </Button> */}
            </div>
        </nav>
    );
}

export function Footer() {
    return (
        <footer className="">
            <div className="mb-9 space-y-9 px-32 max-w-screen-xl mx-auto" id="footer">
                <div className="flex flex-wrap gap-20 justify-between">
                    <Link
                        href={"/"}
                        className="text-lg font-semibold text-blue"
                    >
                        Simply Invite
                    </Link>
                    <div className="flex flex-wrap gap-12">
                        <div className="space-y-6">
                            <p>Company</p>
                            <ul className="space-y-3 text-secondary-text hover:[&>*]:underline">
                                <li>
                                    <Link href={"/terms-of-service"}>
                                        Terms of service
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/privacy-policy"}>
                                        Privacy policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <p>Product</p>
                            <ul className="space-y-3 text-secondary-text hover:[&>*]:underline">
                                <li>
                                    <Link href={"/#how-it-works"}>
                                        How it works
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/#pricing"}>Pricing</Link>
                                </li>
                                <li>
                                    <Link href={"/#faqs"}>FAQs</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <p>Support</p>
                            <ul className="space-y-3 text-secondary-text hover:[&>*]:underline">
                                <li>
                                    <Link href={"/contact"}>Contact us</Link>
                                </li>
                                <li>
                                    <Link href={"/contact#email"}>Email</Link>
                                </li>
                                <li>
                                    <Link href={"/#request-features"}>
                                        Request features
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between border-t border-outline p-4 px-32 text-secondary-text max-w-screen-xl mx-auto">
                <p>© 2024 Simply Invite - All rights reserved.</p>
                <div>
                    Founded by{" "}
                    <a
                        href="https://dcworks.vercel.app/"
                        target="_blank"
                        className="underline duration-100 hover:text-primary-text"
                    >
                        Dhanush C.
                    </a>
                </div>
            </div>
        </footer>
    );
}
