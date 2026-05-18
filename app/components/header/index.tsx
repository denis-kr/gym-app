// import { NavLink, useLocation } from "react-router";
import { Separator } from "~/components/ui/separator";
import { SidebarTrigger } from "~/components/ui/sidebar";
// import { sidebarData } from '../app-sidebar'

export function Header() {
  //TODO the TODO text should be replaced with current page name
  // const location = useLocation();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-vertical:h-4 data-vertical:self-auto"
        />
        <p>TODO</p>
      </div>
    </header>
  );
}
