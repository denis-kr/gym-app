import {
  NavLink,
  useNavigation,
  // useResolvedPath
} from "react-router";
import { SidebarMenuButton } from "~/components/ui/sidebar";

export function AppNavLink({
  url,
  icon,
  name,
}: {
  url: string;
  icon: React.ReactNode;
  name: string;
}) {
  //TODO figure out if it is needed or not?
  // const isItNeeded = useResolvedPath(url);

  const navigation = useNavigation();

  //TODO make sure the logic for indicatig loading of a page if the network is slow

  const isLoading =
    navigation.state === "loading" && url === navigation.location.pathname;

  return (
    <SidebarMenuButton
      asChild
      className={isLoading ? "animate-pulse bg-sidebar-accent" : undefined}
    >
      <NavLink to={url}>
        {icon}
        <span>{name}</span>
      </NavLink>
    </SidebarMenuButton>
  );
}
