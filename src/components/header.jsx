import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

function Header() {
  return (
    <header className="bg-background md:px-6 sticky top-0 z-10 flex items-center justify-between h-16 gap-4 px-4 border-b">
      <nav className="md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 flex-col hidden gap-6 text-lg font-medium">
        <Link
          href="/dashboard"
          className="md:text-base flex items-center gap-2 text-lg font-semibold">
          <Image
            src="/images/logoSmall.png"
            height={44}
            width={44}
            className="object-contain"
            alt="logo"
          />
          <span className="sr-only">WallPict Admin Panel</span>
        </Link>
        <Link
          href="/dashboard"
          className="text-foreground hover:text-foreground transition-colors">
          Home
        </Link>
        <Link
          href="/wallpaper"
          className="text-foreground hover:text-foreground transition-colors">
          Wallpaper
        </Link>
        <Link
          href="/category"
          className="text-foreground hover:text-foreground transition-colors">
          Category
        </Link>
        <Link
          href="/add-wallpaper"
          className="text-foreground hover:text-foreground transition-colors">
          Add Wallpaper
        </Link>
        <Link
          href="/add-category"
          className="text-foreground hover:text-foreground transition-colors">
          Add Category
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <HamburgerMenuIcon className="w-5 h-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-lg font-semibold">
              <Image
                src="/images/logoSmall.png"
                height={60}
                width={60}
                className="object-contain"
                alt="logo"
              />
              <span className="sr-only">WallPict Admin Panel</span>
            </Link>
            <Link
              href="/dashboard"
              className="text-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link
              href="/wallpaper"
              className="text-foreground hover:text-foreground transition-colors">
              Wallpaper
            </Link>
            <Link
              href="/category"
              className="text-foreground hover:text-foreground transition-colors">
              Category
            </Link>
            <Link
              href="/add-wallpaper"
              className="text-foreground hover:text-foreground transition-colors">
              Add Wallpaper
            </Link>
            <Link
              href="/add-category"
              className="text-foreground hover:text-foreground transition-colors">
              Add Category
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="md:ml-auto md:gap-2 lg:gap-4 flex items-center gap-4">
        <h2>
          Welcome <span className="font-bold">amit deka</span>
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Image
                src="/images/logo.svg"
                width={24}
                height={24}
                alt="User Image"
              />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Settings</DropdownMenuItem>
            <DropdownMenuItem disabled>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
export default Header;
