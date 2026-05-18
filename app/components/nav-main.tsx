import {
  SidebarGroup,
  // SidebarGroupLabel,
  SidebarMenu,
  // SidebarMenuAction,
  // SidebarMenuButton,
  SidebarMenuItem,
  // useSidebar,
} from "~/components/ui/sidebar";
// import { HugeiconsIcon } from "@hugeicons/react";
// import {
//   MoreHorizontalCircle01Icon,
//   FolderIcon,
//   Share03Icon,
//   Delete02Icon,
// } from "@hugeicons/core-free-icons";
import { AppNavLink } from "./nav-link";

export function NavMain({
  items,
}: {
  items: {
    name: string;
    url: string;
    icon: React.ReactNode;
  }[];
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <AppNavLink name={item.name} icon={item.icon} url={item.url} />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
