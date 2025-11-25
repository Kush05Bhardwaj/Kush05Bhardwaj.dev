"use client"

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Briefcase, 
  FolderKanban, 
  MessageSquare, 
  Award, 
  Mail,
  LogOut 
} from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken')
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
  }

  // Don't show layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const navItems = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/skills', icon: Award, label: 'Skills' },
    { href: '/admin/experience', icon: Briefcase, label: 'Experience' },
    { href: '/admin/projects', icon: FolderKanban, label: 'Projects' },
    { href: '/admin/testimonials', icon: MessageSquare, label: 'Testimonials' },
    { href: '/admin/contacts', icon: Mail, label: 'Contacts' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0612]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[#1e1b2f] border-r border-[#2d2640]">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-[#2d2640] px-6">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7b3fe4] to-[#b799ff]">
              Admin Panel
            </h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-[#2d2640] ${
                    isActive
                      ? 'bg-[#7b3fe4]/10 text-[#7b3fe4]'
                      : 'text-[#a5a5c8] hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Logout Button */}
          <div className="border-t border-[#2d2640] p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#a5a5c8] transition-all hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
