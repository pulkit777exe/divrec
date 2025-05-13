import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Compass,
  GalleryHorizontalEnd,
  Home,
  LogIn,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignUpButton, UserButton } from "@clerk/nextjs";

interface MenuProps {
  title: string;
  icon: LucideIcon;
  path: string;
}

const MenuOptions: MenuProps[] = [
  {
    title: "Home",
    icon: Home,
    path: "/",
  },
  {
    title: "Discover",
    icon: Compass,
    path: "/",
  },
  {
    title: "Library",
    icon: GalleryHorizontalEnd,
    path: "/",
  },
  {
    title: "Sign In",
    icon: LogIn,
    path: "/sign-in",
  },
];

export function AppSidebar() {
  // const user = useUser();
  return (
    <Sidebar className="bg-accent">
      <div className="bg-accent flex justify-center items-center pt-4">
        <Image src={"/logo.png"} alt="DIVREC" width={150} height={150} />
      </div>
      <SidebarHeader className="bg-accent" />
      <SidebarContent className="bg-accent">
        <SidebarGroup />
        <SidebarContent>
          <SidebarMenu className="">
            {MenuOptions.map((menu, index) => (
              <SidebarMenuItem key={index} className="text-center w-full">
                <SidebarMenuButton
                  asChild
                  className="p-5 hover:bg-secondary/100"
                >
                  <a href={menu.path}>
                    <menu.icon className="h-8 w-8" />
                    <span className="text-lg">{menu.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <SignUpButton mode="modal">
            <Button className="rounded-full mx-6 mt-4">Sign Up</Button>
          </SignUpButton>
          {/* {user.isSignedIn ? <div className="hidden"></div> : <SignUpButton mode="modal">
            <Button className="rounded-full mx-6 mt-4">Sign Up</Button>
          </SignUpButton>} */}
        </SidebarContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="bg-accent">
        <div className="px-4 pb-2">
          For more updates follow our star our Github Repository
        </div>
        <Button>Learn More</Button>
        <UserButton />
      </SidebarFooter>
    </Sidebar>
  );
}
