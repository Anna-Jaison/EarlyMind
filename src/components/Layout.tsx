import { CloudSun } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen font-[Outfit] overflow-hidden flex flex-col text-soft-blue">

      {/* Background is handled by body gradient */}

      {/* Decorative Blur Orbs to enhance the mesh effect */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-multiply opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-soft-lavender rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-soft-green rounded-full blur-[100px] animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 w-full flex-grow flex flex-col">

        {/* Header - Glassmorphism */}
        <header className="w-full bg-white/40 backdrop-blur-md border-b border-white/50 sticky top-0 z-50">
          <div className="w-full max-w-[1400px] mx-auto px-8 py-5 flex justify-between items-center">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="p-2.5 bg-soft-blue rounded-2xl shadow-lg shadow-soft-blue/20 group-hover:scale-105 transition-transform duration-500">
                <CloudSun className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-soft-blue group-hover:text-soft-lavender transition-colors">
                EarlyMind
              </h1>
            </div>

            <nav className="hidden md:flex gap-8 text-sm font-bold text-soft-blue/70">
              <a href="#" className="hover:text-soft-blue transition-colors">About</a>
              <a href="#" className="hover:text-soft-blue transition-colors">Parents</a>
              <a href="#" className="px-6 py-2.5 bg-white text-soft-blue border border-white rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all">
                Contact
              </a>
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main className="w-full flex-grow flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}
