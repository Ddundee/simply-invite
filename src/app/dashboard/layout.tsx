import {
    SignedOut,
    SignInButton,
    SignUpButton,
    SignedIn,
    UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { ButtonGroup, Button } from "../_components/button";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import { cn } from "~/lib/utils";

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="min-h-screen">
            <nav
                className="flex items-center justify-between border-b border-outline py-6 [&>*]:mx-6"
                id="nav"
            >
                {/* <div className="flex items-center justify-between gap-12"> */}
                <Link
                    href={"/dashboard"}
                    className="text-lg font-semibold text-blue"
                >
                    Simply Invite
                </Link>
                {/* </div> */}
                <div className="flex gap-3">
                    <NavigationMenu className="">
                        <NavigationMenuList className="flex gap-1">
                            <NavigationMenuItem>
                                <Link href="/contact" legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={cn(
                                            "block rounded-md p-3 text-sm leading-none text-secondary-text no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                        )}
                                    >
                                        Feedback
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    className={cn(
                                        "block rounded-md p-3 text-sm leading-none text-secondary-text no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                    )}
                                >
                                    Request features
                                </NavigationMenuLink>
                                {/* <Link href="/contact" legacyBehavior passHref> */}
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <SignedOut>
                        <ButtonGroup>
                            <SignInButton>Sign in</SignInButton>
                            <SignUpButton>Sign up</SignUpButton>
                        </ButtonGroup>
                        <Link href={"/"}>
                            <Button>Go Home</Button>
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        {/* <h2>
                            TODO: insert notif button  Insert TODO Button
                        </h2> */}
                        <UserButton
                            appearance={{
                                elements: { userButtonAvatarBox: "w-10 h-10" },
                            }}
                        />
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
