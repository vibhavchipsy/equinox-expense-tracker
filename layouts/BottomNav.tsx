'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: '🏠' },
    { href: '/dashboard', label: '+' }, // big center add button (if needed)
    { href: '/dashboard', label: '📊' },
  ];

  return (
    <nav className="flex justify-around py-4 bg-white border-t">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-sm text-xl font-bold ${
            pathname === link.href ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
