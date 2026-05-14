import { NavLink } from "react-router";

export function Header() {
    return (
        <header>
            <NavLink to="/dashboard">dashboard</NavLink>
        </header>
    );
}