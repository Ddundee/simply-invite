import Link from "next/link";
import { ArrowLeft, Check } from "./_components/icons";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuLinkItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "~/components/ui/navigation-menu"
import { cn } from "~/lib/utils";
import { Button, ButtonGroup } from "./_components/button";
import { Separator } from "@radix-ui/react-separator";
import Card from "./_components/card";
import Pricing from "./_components/pricing";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "~/components/ui/accordion"
import FAQs from "./_components/faqs";

export default function HomePage() {
    return (
        <>
            <Nav />
            <main className="mt-32 space-y-32">
                <div className="flex flex-col justify-center items-center space-y-9" id="hero">
                    <div className="space-y-2">
                        <h1 className="text-5xl text-center font-bold">Your design, our delivery.<br /> Invites made simple.</h1>
                        <p className="text-center text-secondary-text">An easy, dirt cheap way to share your event invitations. Upload your<br /> custom design, get a shareable link. And then party time 🥳.</p>
                    </div>
                    <Button>
                        Invite Now
                        <ArrowLeft />
                    </Button>
                </div>

                <div className="space-y-9">
                    <h2 className="text-center text-2xl font-medium">People love us</h2>
                    <div className="flex gap-12 justify-center items-center">
                        <div className="flex flex-col gap-3 items-center">
                            <h3 className="text-5xl text-blue font-semibold">{0}</h3>
                            <p className="text-secondary-text">Events Created</p>
                        </div>
                        <Separator className="bg-outline h-20 w-px" orientation="vertical" />
                        <div className="flex flex-col gap-3 items-center">
                            <h3 className="text-5xl text-blue font-semibold">{0}</h3>
                            <p className="text-secondary-text">Users</p>
                        </div>
                        <Separator className="bg-outline h-20 w-px" orientation="vertical" />
                        <div className="flex flex-col gap-3 items-center">
                            <h3 className="text-5xl text-blue font-semibold">{100}%</h3>
                            <p className="text-secondary-text">Satisfaction rate
                                (by me)</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-9" id="how-it-works">
                    <h2 className="text-2xl font-medium">How it works</h2>
                    <div className="grid grid-cols-3 gap-6">
                        <Card title="1. Upload Your Invitation Design">
                            <p className="text-secondary-text">Already have a design? Perfect! Just upload your custom invitation in seconds. If you don’t have one, it’s ok!</p>
                        </Card>
                        <Card title="2. Share Your Invitation">
                            <p className="text-secondary-text">Once your invite is uploaded, we’ll create a unique link that you can easily share with friends, family, or colleagues. Send it directly yourself, or choose our optional delivery service, and we’ll handle the emailing or texting to each guest on your behalf.</p>
                        </Card>
                        <Card title="3. Track and Manage Responses">
                            <p className="text-secondary-text">Easily see who’s viewed your invite and who’s responded. Stay organized and keep track of your event all in one place.</p>
                        </Card>
                    </div>
                </div>

                <Pricing />

                <FAQs />

                <Footer />

            </main>
        </>
    );
}


export function Nav() {
    return (
        <nav className="flex justify-between py-6 border-b border-outline" id="nav">
            <div className="flex justify-between gap-12 items-center">
                <Link href={"/"} className="text-blue text-lg font-semibold">Simply Invite</Link>
                <NavigationMenu>
                    <NavigationMenuList className="space-x-1">
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
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
                        <NavigationMenuItem>
                            <Link href="/#pricing" legacyBehavior passHref>
                                <NavigationMenuLink className={cn(
                                    "block rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm font-medium",
                                )}>
                                    Pricing
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/contact" legacyBehavior passHref>
                                <NavigationMenuLink className={cn(
                                    "block rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm font-medium",
                                )}>
                                    Contact us
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="flex gap-3">
                <ButtonGroup>
                    <Link href={"/sign-in"}>Sign in</Link>
                    <Link href={"/sign-in"}>Sign up</Link>
                </ButtonGroup>
                <Button>
                    Invite Now
                    <ArrowLeft />
                </Button>
            </div>

        </nav >
    )
}


export function Footer() {
    return (
        <footer className="space-y-9 mb-9" id="footer">
            <div className="flex justify-between">
                <Link href={"/"} className="text-blue text-lg font-semibold">Simply Invite</Link>
                <div className="flex gap-12">
                    <div className="space-y-6">
                        <p>Company</p>
                        <ul className="space-y-3 text-secondary-text hover:[&>*]:underline">
                            <li><Link href={"/terms-of-service"}>Terms of service</Link></li>
                            <li><Link href={"/privacy-policy"}>Privacy policy</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <p>Product</p>
                        <ul className="space-y-3 text-secondary-text hover:[&>*]:underline">
                            <li><Link href={"/#how-it-works"}>How it works</Link></li>
                            <li><Link href={"/#pricing"}>Pricing</Link></li>
                            <li><Link href={"/#faqs"}>FAQs</Link></li>

                        </ul>
                    </div>
                    <div className="space-y-6">
                        <p>Support</p>
                        <ul className="space-y-3 text-secondary-text hover:[&>*]:underline">
                            <li><Link href={"/contact"}>Contact us</Link></li>
                            <li><Link href={"/contact#email"}>Email</Link></li>
                            <li><Link href={"/#request-features"}>Request features</Link></li>
                        </ul>
                    </div>

                </div>
            </div>
            <div className="border-t border-outline p-4 text-secondary-text flex justify-between">
                <p>© 2024 Simply Invite - All rights reserved.</p>
                <div>
                    Founded by <a href="https://dcworks.vercel.app/" target="_blank" className="underline">Dhanush C.</a>
                </div>
            </div>
        </footer>
    )
}