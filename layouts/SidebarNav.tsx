'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SidebarNav() {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: 'Home' },
    { href: '/dashboard/add', label: 'Add Expense' },
    { href: '/dashboard/expenses', label: 'View Expenses' },
  ];

  return (
    <nav className="p-4 space-y-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`block text-sm font-medium ${
            pathname === link.href ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
