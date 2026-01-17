import { BrainCircuit } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen font-[Outfit] overflow-hidden flex flex-col bg-prof-cream text-prof-blue">

      {/* Background Ambience - Subtle Dots */}
      <div className="fixed inset-0 pointer-events-none z-0 pattern-dots opacity-30" />

      {/* Elegant Lavender Circle - Decorative */}
      <div className="fixed -top-[10%] -right-[5%] w-[600px] h-[600px] rounded-full border border-prof-lavender/20 pointer-events-none z-0" />
      <div className="fixed top-[20%] -left-[10%] w-[400px] h-[400px] rounded-full bg-prof-sky/50 blur-3xl pointer-events-none z-0" />

      {/* Main Content Wrapper */}
      <div className="relative z-10 w-full flex-grow flex flex-col">

        {/* Header - Minimal & Professional */}
        <header className="w-full bg-prof-cream/90 backdrop-blur-md border-b border-prof-blue/5 sticky top-0 z-50">
          <div className="w-full max-w-[1400px] mx-auto px-8 py-6 flex justify-between items-center">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="p-2 bg-white border-2 border-prof-blue rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300">
                <BrainCircuit className="w-6 h-6 text-prof-blue" />
              </div>
              <h1 className="text-2xl font-light tracking-wide text-prof-blue">
                Early<span className="font-bold">Mind</span>
              </h1>
            </div>

            <nav className="hidden md:flex gap-8 text-sm font-medium text-prof-blue/70">
              <a href="#" className="hover:text-prof-blue transition-colors">Methodology</a>
              <a href="#" className="hover:text-prof-blue transition-colors">Specialists</a>
              <a href="#" className="px-6 py-2.5 bg-white border border-prof-blue text-prof-blue rounded-full hover:bg-prof-blue hover:text-white transition-all shadow-sm">
                Professional Login
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
