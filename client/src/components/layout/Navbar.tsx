import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();
  const cart = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "Philosophy" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-8 mt-10">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <span 
                        className="text-2xl font-serif cursor-pointer hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </span>
                    </Link>
                  ))}
                  {isAuthenticated && (
                     <Link href="/admin">
                       <span className="text-xl text-primary font-medium cursor-pointer" onClick={() => setIsOpen(false)}>
                         Admin Dashboard
                       </span>
                     </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <span className="font-serif text-2xl tracking-widest font-bold cursor-pointer uppercase">
                Studio Treta
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-12 items-center">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={`cursor-pointer text-sm tracking-widest uppercase hover:text-primary transition-colors ${location === link.href ? 'border-b border-primary pb-1' : ''}`}>
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
               <div className="hidden md:flex items-center gap-4">
                 <Link href="/admin">
                   <Button variant="ghost" size="sm">Admin</Button>
                 </Link>
                 <Button variant="outline" size="sm" onClick={() => logout()}>Logout</Button>
               </div>
            ) : (
              <Link href="/api/login">
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cart.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cart.items.length}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
