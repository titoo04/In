import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Journey", href: "/states/noise" },
  { label: "Shop", href: "/shop/noise" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/#about" },
];

export default function Nav() {
  return (
    <nav className="flex items-center gap-6 text-sm font-medium text-zinc-600">
      {navItems.map((item) => (
        <Link key={item.label} href={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
