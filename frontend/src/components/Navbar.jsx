import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, User, School } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();

  const navigationLinks = [
    { path: '/', label: 'Home', icon: <BookOpen className="w-4 h-4" /> },
    { path: '/behavioral-records', label: 'Behavioral Records', icon: <User className="w-4 h-4" /> },
    { path: '/extracurricular-activities', label: 'Extracurricular Activities', icon: <School className="w-4 h-4" /> },
    { path: '/student-awards', label: 'Student Awards', icon: <BookOpen className="w-4 h-4" /> },
    { path: '/class-section', label: 'Class Section', icon: <User className="w-4 h-4" /> },
    { path: '/term-details', label: 'Term Details', icon: <School className="w-4 h-4" /> },
  ];

  const isActiveLink = (path) => location.pathname === path;

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-48">
            <Link to="/" className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/logo.jpg" alt="School Logo" />
                <AvatarFallback>KC</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-lg font-semibold">KreupCampus360</span>
                <span className="text-xs text-muted-foreground">
                  Personal & Social Records System
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                {navigationLinks.map((link) => (
                  <NavigationMenuItem key={link.path}>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 text-sm font-medium",
                        isActiveLink(link.path) && "text-primary"
                      )}
                    >
                      <Link to={link.path}>
                        {link.icon}
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* User Profile */}
          <div className="hidden md:flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/user.jpg" alt="User" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Human</span>
              <span className="text-xs text-muted-foreground">Administrator</span>
            </div>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              {/* Add SheetHeader with Title */}
              <SheetHeader>
                <SheetTitle>Navigation Menu</SheetTitle>
                <SheetDescription>
                  Access navigation links and your profile information
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 pb-4 border-b">
                  <Avatar>
                    <AvatarImage src="/user.jpg" alt="User" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Human</p>
                    <p className="text-xs text-muted-foreground">Administrator</p>
                  </div>
                </div>
                {navigationLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "flex items-center gap-2 px-2 py-1 text-sm",
                      isActiveLink(link.path) && "text-primary"
                    )}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;