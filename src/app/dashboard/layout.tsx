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
import { EInviteNotFound } from "../_components/einvite-display";

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="min-h-screen">
            <nav
                className="border-outline sticky top-0 flex items-center justify-between border-b bg-background/30 py-2 backdrop-blur-md [&>*]:mx-6"
                id="nav"
            >
                <Link
                    href={"/dashboard"}
                    className="text-blue text-lg font-semibold"
                >
                    Dashboard
                </Link>
                {/* </div> */}
                <div className="flex gap-3">
                    <NavigationMenu>
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
                        <Link href={"/"}>
                            <Button>Go Home</Button>
                        </Link>
                    </SignedOut>
                    <SignedIn></SignedIn>
                </div>
            </nav>

            <SignedIn>{children}</SignedIn>
            <SignedOut>
                <EInviteNotFound />
            </SignedOut>
        </div>
    );
}
