"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";

export default function Header() {
  const pathname = usePathname();

  const items: MenuItem[] = [
    {
      label: "Home",
      icon: "pi pi-home",
      url: "/",
      className: pathname === "/" ? "active-menu-item" : "",
    },
    {
      label: "About Us",
      icon: "pi pi-info-circle",
      url: "/about-us",
      className: pathname === "/about-us" ? "active-menu-item" : "",
    },
    {
      label: "Projects",
      icon: "pi pi-briefcase",
      url: "/projects",
      className: pathname === "/projects" ? "active-menu-item" : "",
    },
    {
      label: "Database",
      icon: "pi pi-database",
      url: "/database",
      className: pathname === "/database" ? "active-menu-item" : "",
    },
  ];

  const start = (
    <Link href="/" className="flex align-items-center">
      <span className="text-xl font-bold ml-2">My Desktop App</span>
    </Link>
  );

  return (
    <header className="shadow-md">
      <Menubar model={items} start={start} />
    </header>
  );
}
