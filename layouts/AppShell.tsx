'use client';

import SidebarNav from './SidebarNav';
import BottomNav from './BottomNav';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100 flex min-h-screen">
      {/* Sidebar for desktop only */}
      <aside className="hidden md:block bg-white border-r w-64 p-4">
        <SidebarNav />
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Main content */}
        <main className="flex-1 p-4">{children}</main>

        {/* Bottom nav for mobile only */}
        <footer className="block md:hidden bg-white fixed w-full bottom-0">
          <BottomNav />
        </footer>
      </div>
    </div>
  );
}
