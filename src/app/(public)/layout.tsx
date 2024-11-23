import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";

import { cn } from "~/lib/utils";

import React from "react";
import { Button, buttonVariants } from "~/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "~/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

type LayoutProps = Readonly<{
    children: React.ReactNode;
    layoutProps?: {
        className?: string;
    };
}>;

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <nav className="flex w-full justify-between border-b px-4 py-6 md:px-32">
                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="text-lg font-semibold text-primary lg:mr-12"
                    >
                        Simply Invite
                    </Link>
                    <NavigationMenu>
                        <NavigationMenuList className="hidden md:flex">
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="text-sm font-medium">
                                    Resources
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="w-fit p-3">
                                        <NavigationMenuListItem href="/docs">
                                            How It Works
                                        </NavigationMenuListItem>
                                        <NavigationMenuListItem href="/docs/installation">
                                            Request Features
                                        </NavigationMenuListItem>
                                        <NavigationMenuListItem href="/docs/primitives/typography">
                                            FAQs
                                        </NavigationMenuListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "text-sm font-medium",
                                )}
                            >
                                Contact Us
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="hidden gap-3 fade-in md:flex">
                    <SignedOut>
                        <div className="isolate -space-x-px">
                            <SignInButton>
                                <Button className="rounded-r-none focus:z-10">
                                    Sign In
                                </Button>
                            </SignInButton>
                            <SignUpButton>
                                <Button className="rounded-l-none focus:z-10">
                                    Sign Up
                                </Button>
                            </SignUpButton>
                        </div>
                    </SignedOut>
                    <SignedIn>
                        <Link href="/dashboard" className={buttonVariants()}>
                            Dashboard
                        </Link>
                    </SignedIn>
                </div>
                <div className="flex md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost">
                                <HamburgerMenuIcon />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle className="text-primary">
                                    Simply Invite
                                </SheetTitle>
                            </SheetHeader>
                            <div>
                                <ul className="space-y-1 p-3">
                                    <SheetListItem href="/docs">
                                        How It Works
                                    </SheetListItem>
                                    <SheetListItem href="/docs/installation">
                                        Request Features
                                    </SheetListItem>
                                    <SheetListItem href="/docs/primitives/typography">
                                        FAQs
                                    </SheetListItem>
                                    <SignedOut>
                                        <li>
                                            <SignInButton>
                                                <Button className="w-full">
                                                    Sign In
                                                </Button>
                                            </SignInButton>
                                        </li>
                                        <li>
                                            <SignUpButton>
                                                <Button className="w-full">
                                                    Sign Up
                                                </Button>
                                            </SignUpButton>
                                        </li>
                                    </SignedOut>
                                    <li className="flex w-full items-center gap-3">
                                        <SignedIn>
                                            <Link
                                                href="/dashboard"
                                                className={cn(
                                                    buttonVariants(),
                                                    "w-full",
                                                )}
                                            >
                                                Dashboard
                                            </Link>
                                        </SignedIn>
                                    </li>
                                </ul>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
            <main className="mx-auto my-32 max-w-screen-xl space-y-32 p-4 px-32 lg:px-32">
                {children}
            </main>
            <footer className="w-full space-y-6 [&>*]:px-4 [&>*]:py-6 [&>*]:md:px-32">
                <div className="flex flex-wrap justify-between gap-6">
                    <Link
                        href="/"
                        className="text-lg font-semibold text-primary lg:mr-12"
                    >
                        Simply Invite
                    </Link>
                    <div className="flex flex-wrap gap-8">
                        <div className="space-y-6">
                            <p>Company</p>
                            <ul className="space-y-3">
                                <li className="text-secondary-foreground/60 hover:text-secondary-foreground/70">
                                    <Link href="/terms-of-service">
                                        Terms Of Service
                                    </Link>
                                </li>
                                <li className="text-secondary-foreground/60 hover:text-secondary-foreground/70">
                                    <Link href="/privacy-policy">
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <p>Product</p>
                            <ul className="space-y-3">
                                <li className="text-secondary-foreground/60 hover:text-secondary-foreground/70">
                                    <Link href="/#how-it-works">
                                        How It Works
                                    </Link>
                                </li>
                                <li className="text-secondary-foreground/60 hover:text-secondary-foreground/70">
                                    <Link href="/#faqs">FAQs</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <p>Support</p>
                            <ul className="space-y-3">
                                <li className="text-secondary-foreground/60 hover:text-secondary-foreground/70">
                                    <Link href="/contact-us">Contact Us</Link>
                                </li>
                                <li className="text-secondary-foreground/60 hover:text-secondary-foreground/70">
                                    <Link href="/contact-us">
                                        Request Features
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-between gap-6 border-t text-secondary-foreground/60">
                    <p>© 2024 Simply Invite - All rights reserved.</p>
                    <p>
                        Founded by{" "}
                        <a
                            href="https://github.com/Ddundee"
                            className="hover:text-secondary-foreground/70 hover:underline"
                        >
                            Dhanush C.
                        </a>
                    </p>
                </div>
            </footer>
        </>
    );
}

const NavigationMenuListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 text-nowrap rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className,
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {children}
                    </div>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
NavigationMenuListItem.displayName = "NavigationMenuListItem";

const SheetListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, children, ...props }, ref) => {
    return (
        <li>
            <a
                ref={ref}
                className={cn(
                    "block select-none space-y-1 text-nowrap rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    className,
                )}
                {...props}
            >
                <div className="text-sm font-medium leading-none">
                    {children}
                </div>
            </a>
        </li>
    );
});
SheetListItem.displayName = "SheetListItem";
