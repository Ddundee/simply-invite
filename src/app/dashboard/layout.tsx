import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="min-h-screen">
            <nav
                className="border-outline sticky top-0 flex items-center justify-between border-b bg-background/30 py-2 backdrop-blur-md [&>*]:mx-6"
                id="nav"
            >
                {/* <div className="flex items-center justify-between gap-12"> */}
                <Link
                    href={"/dashboard"}
                    className="text-blue text-lg font-semibold"
                >
                    Dashboard
                </Link>
                {/* </div> */}
                <div className="flex gap-3">
                    <NavigationMenu className="">
                        <NavigationMenuList className="flex items-center gap-1">
                            <NavigationMenuItem>
                                <Link href="/contact" legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={cn(
                                            "block rounded-md p-3 text-sm leading-none text-secondary-foreground no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                        )}
                                    >
                                        Feedback
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/contact" legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={cn(
                                            "block rounded-md p-3 text-sm leading-none text-secondary-foreground no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                        )}
                                    >
                                        Request features
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <UserButton />
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <SignedOut>
                        {/* <ButtonGroup>
                            <SignInButton
                                signUpForceRedirectUrl={"/dashboard"}
                                forceRedirectUrl={"/dashboard"}
                            >
                                Sign in
                            </SignInButton>
                            <SignUpButton
                                signInFallbackRedirectUrl={"/dashboard"}
                                fallbackRedirectUrl={"/dashboard"}
                            >
                                Sign up
                            </SignUpButton>
                        </ButtonGroup> */}
                        <Link href={"/"}>
                            <Button>Go Home</Button>
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        {/* <h2>
                            TODO: insert notif button  Insert TODO Button
                        </h2> */}
                    </SignedIn>
                </div>
            </nav>

            <SignedIn>{children}</SignedIn>
            <SignedOut>
                <main className="mt-32 flex h-full w-full flex-col items-center justify-center gap-3">
                    <h1>How did you get here? 💀</h1>
                    <Link href="/">
                        <Button>Go Home</Button>
                    </Link>
                </main>
            </SignedOut>
        </div>
    );
}
