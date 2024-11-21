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
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "~/components/ui/sheet";

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
import { ArrowRightIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "~/components/ui/button";

export default function Page() {
    return (
        <>
            <Nav />
            <main className="mx-auto my-32 max-w-screen-xl space-y-32 p-4 md:px-32">
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
                            An easy, dirt cheap way to share your event
                            invitations. Upload your custom design, get a
                            shareable link. And then party time 🥳.
                        </p>
                    </div>
                    <SignUpButton>
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
            className="flex justify-between border-b border-outline p-4 py-6 md:px-32"
            id="nav"
        >
            <div className="flex max-w-screen-xl items-center justify-between gap-12">
                <Link href={"/"} className="text-lg font-semibold text-blue">
                    Simply Invite
                </Link>
                <NavigationMenu className="hidden md:block">
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
            <div className="hidden gap-3 fade-in md:flex">
                <SignedOut>
                    <ButtonGroup>
                        <div className="fade-in">
                            <SignInButton>Sign in</SignInButton>
                        </div>
                        <div className="fade-in">
                            <SignUpButton>Sign up</SignUpButton>
                        </div>
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
            <div className="block">
                {" "}
                {/* md:hidden  */}
                <Sheet>
                    <SheetTrigger>
                        <HamburgerMenuIcon />
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Simply Invite</SheetTitle>
                        </SheetHeader>
                        <div className="my-8 flex flex-col gap-3">
                            <Link
                                href={"/#how-it-works"}
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "justify-start text-base",
                                )}
                            >
                                How it works
                            </Link>
                            <Link
                                href={"/contact"}
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "justify-start text-base",
                                )}
                            >
                                Contact Us
                            </Link>
                            <Link
                                href={"/#faqs"}
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "justify-start text-base",
                                )}
                            >
                                FAQs
                            </Link>
                            <div className="mx-3 my-4 w-full space-y-3 [&>*]:w-full">
                                <SignInButton>
                                    <Button>Sign in</Button>
                                </SignInButton>
                                <SignUpButton>
                                    <Button>Sign up</Button>
                                </SignUpButton>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
}

export function Footer() {
    return (
        <footer className="">
            <div
                className="mx-auto mb-9 max-w-screen-xl space-y-9 px-32"
                id="footer"
            >
                <div className="flex flex-wrap justify-between gap-20">
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
            <div className="mx-auto flex max-w-screen-xl justify-between border-t border-outline p-4 text-secondary-text md:px-32">
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
