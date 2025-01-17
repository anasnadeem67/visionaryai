"use client"

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const MobileNav = () => {
    const pathname = usePathname();
  return (
    <div className="md:hidden"> {/* This line ensures the component is hidden on medium and larger screens */}
      <header className="header flex justify-between items-center p-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>

        <nav className="flex gap-2 items-center">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <Sheet>
              <SheetTrigger>
                <Image 
                src="/assets/icons/menu.svg"
                alt="menu"
                width={32}
                height={32}
                className="cursor-pointer"
                />
              </SheetTrigger>
              <SheetContent className="sheet-content sm:w-64">
                <>
                <Image 
                src="/assets/images/logo-text.svg"
                alt="logo"
                width={152}
                height={23}
                />
                <ul className="header-nav_elements">
              {navLinks.map((link) => {
                const isActive = link.route === pathname;

                return (
                  <li
                  className={`${isActive &&
                  'gradient-text'} p-18 flex
                  whitespace-nowrap text-dark-700`}
                  key={link.route}
                  >
                    <Link className="sidebar-link cursor-pointer" href={link.route}>
                      <Image
                        src={link.icon}
                        alt={link.label}
                        width={24}
                        height={24}
                        
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className='flex-center cursor-pointer gap-2 p-4'>
                <UserButton afterSignOutUrl='/sign-in' showName />
              </li>
            </ul>
                </>
              </SheetContent>
            </Sheet>
          </SignedIn>
          <SignedOut>
            <Button asChild className="button bg-purple-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </header>
    </div>
  );
};

export default MobileNav;
