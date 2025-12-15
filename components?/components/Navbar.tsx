import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, Terminal } from 'lucide-react';

interface NavbarProps {
  onOpenAssessment: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAssessment }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = "relative text-xs font-mono font-medium text-sentrl-text/70 hover:text-sentrl-cyan transition-colors tracking-widest py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-sentrl-cyan after:transition-all hover:after:w-full";

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-[#06080A]/80 backdrop-blur-xl border-sentrl-steel/10 py-3' 
          : 'bg-transparent border-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Logo />

        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8 bg-sentrl-surface/30 px-6 py-2 rounded-full border border-sentrl-steel/10 backdrop-blur-sm">
            <a href="#about" className={navLinkClass}>// PLATFORM</a>
            <a href="#problem" className={navLinkClass}>// SOLUTIONS</a>
            <a href="#approach" className={navLinkClass}>// APPROACH</a>
          </div>
          
          <button 
            onClick={onOpenAssessment}
            className="group relative overflow-hidden px-6 py-2.5 border border-sentrl-cyan/50 text-sentrl-cyan text-[10px] font-bold font-mono tracking-[0.2em] hover:bg-sentrl-cyan hover:text-sentrl-bg transition-all uppercase"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Terminal size={12} />
              Initiate_Assessment
            </span>
            <div className="absolute inset-0 bg-sentrl-cyan/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>

        <button 
          className="md:hidden text-sentrl-cyan p-2 border border-sentrl-steel/30"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#06080A] border-b border-sentrl-steel/20 p-8 flex flex-col gap-8 md:hidden h-screen z-50">
           <a href="#about" className="text-lg font-mono text-sentrl-text/70 hover:text-sentrl-cyan border-l-2 border-transparent hover:border-sentrl-cyan pl-4 transition-all" onClick={() => setIsMobileMenuOpen(false)}>01 // PLATFORM</a>
           <a href="#problem" className="text-lg font-mono text-sentrl-text/70 hover:text-sentrl-cyan border-l-2 border-transparent hover:border-sentrl-cyan pl-4 transition-all" onClick={() => setIsMobileMenuOpen(false)}>02 // SOLUTIONS</a>
           <a href="#approach" className="text-lg font-mono text-sentrl-text/70 hover:text-sentrl-cyan border-l-2 border-transparent hover:border-sentrl-cyan pl-4 transition-all" onClick={() => setIsMobileMenuOpen(false)}>03 // APPROACH</a>
           <button 
             onClick={() => {
               setIsMobileMenuOpen(false);
               onOpenAssessment();
             }}
             className="w-full py-4 border border-sentrl-cyan text-sentrl-cyan text-xs font-bold tracking-widest uppercase bg-sentrl-cyan/5 hover:bg-sentrl-cyan hover:text-sentrl-bg transition-colors"
           >
            Initiate Assessment
          </button>
        </div>
      )}
    </nav>
  );
};
