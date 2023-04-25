const { default: Link } = require("next/link");

const links = [
  {
    href: "/settings/answers",
    label: "Answers",
  },
  {
    href: "/settings/topics",
    label: "Topics",
  },
];

const SettingsNavbar = () => {
  return (
    <nav className="p-2 border-t border-b">
      <ul className="flex gap-4 items-center">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SettingsNavbar;
