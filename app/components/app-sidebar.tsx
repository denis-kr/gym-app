import * as React from "react";
import { NavMain } from "~/components/nav-main";
import { NavSecondary } from "~/components/nav-secondary";
import { NavUser } from "~/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ChartRingIcon,
  SentIcon,
  CropIcon,
  PieChartIcon,
  MapsIcon,
  CommandIcon,
} from "@hugeicons/core-free-icons";
import { NavLink } from "react-router";

export const sidebarData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navSecondary: [
    {
      title: "Support",
      url: "/support",
      icon: <HugeiconsIcon icon={ChartRingIcon} strokeWidth={2} />,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: <HugeiconsIcon icon={SentIcon} strokeWidth={2} />,
    },
  ],
  navMain: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: <HugeiconsIcon icon={CropIcon} strokeWidth={2} />,
    },
    {
      name: "Exercises",
      url: "/exercises",
      icon: <HugeiconsIcon icon={PieChartIcon} strokeWidth={2} />,
    },
    {
      name: "About program",
      url: "/about",
      icon: <HugeiconsIcon icon={MapsIcon} strokeWidth={2} />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <NavLink to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <HugeiconsIcon
                    icon={CommandIcon}
                    strokeWidth={2}
                    className="size-4"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Gym app</span>
                  <span className="truncate text-xs">Accountability</span>
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
        <NavSecondary items={sidebarData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
