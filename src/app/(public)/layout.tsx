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
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
} from "@clerk/nextjs";
import { ArrowRightIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "~/components/ui/button";

import React from "react";
import { ButtonGroup, Button } from "~/app/_components/button";

type LayoutProps = Readonly<{
    children: React.ReactNode;
    layoutProps?: {
        className?: string;
    };
}>;

export default function Layout({ children, layoutProps }: LayoutProps) {
    return (
        <>
            <Nav />
            <main
                className={cn(
                    "mx-auto my-32 max-w-screen-xl space-y-32 p-4 px-32 lg:px-32",
                    layoutProps?.className,
                )}
            >
                {children}
            </main>
            <Footer />
        </>
    );
}

export function Nav() {
    return (
        <nav
            className="flex justify-between border-b border-outline p-4 py-6 lg:px-32"
            id="nav"
        >
            <div className="flex max-w-screen-xl items-center justify-between gap-12">
                <Link href={"/"} className="text-lg font-semibold text-blue">
                    Simply Invite
                </Link>
                <NavigationMenu className="hidden lg:block">
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
            <div className="hidden gap-3 fade-in lg:flex">
                <SignedOut>
                    <ButtonGroup>
                        <div className="fade-in">
                            <SignInButton
                                signUpForceRedirectUrl={"/dashboard"}
                                forceRedirectUrl={"/dashboard"}
                            >
                                Sign in
                            </SignInButton>
                        </div>
                        <div className="fade-in">
                            <SignUpButton
                                signInFallbackRedirectUrl={"/dashboard"}
                                fallbackRedirectUrl={"/dashboard"}
                            >
                                Sign up
                            </SignUpButton>
                        </div>
                    </ButtonGroup>
                    <SignUpButton
                        signInFallbackRedirectUrl={"/dashboard"}
                        fallbackRedirectUrl={"/dashboard"}
                    >
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
            <div className="block lg:hidden">
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
                                <SignUpButton
                                    signInFallbackRedirectUrl={"/dashboard"}
                                    fallbackRedirectUrl={"/dashboard"}
                                >
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
            <div className="mx-auto flex max-w-screen-xl justify-between border-t border-outline p-4 text-secondary-text lg:px-32">
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
