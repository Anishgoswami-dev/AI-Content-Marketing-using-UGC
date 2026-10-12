import React, { useState } from 'react';
import { Sparkles, LayoutDashboard, Wand2, BookOpen, Key, Menu, X, Shield, FolderGit2 } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'dashboard' | 'generator' | 'results' | 'promptlab' | 'templates' | 'campaigns';
  onNavigate: (view: 'landing' | 'dashboard' | 'generator' | 'results' | 'promptlab' | 'templates' | 'campaigns') => void;
  apiKeyConfigured: boolean;
  onOpenKeyModal: () => void;
  campaignsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  apiKeyConfigured,
  onOpenKeyModal,
  campaignsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'landing', label: 'Home', icon: Sparkles },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'generator', label: 'Create Ad', icon: Wand2 },
    { id: 'templates', label: 'Templates', icon: BookOpen },
    { id: 'promptlab', label: 'Prompt Lab', icon: Shield },
    { id: 'campaigns', label: `My Campaigns (${campaignsCount})`, icon: FolderGit2 },
  ] as const;

  return (
    <header className="sticky top-0 z-40 glass-nav transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-midnight text-white shadow-md group-hover:scale-105 transition-transform">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-violet-brand to-coral-brand opacity-80 blur-[2px] group-hover:opacity-100 transition-opacity" />
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-midnight text-white">
                <Sparkles className="h-4 w-4 text-violet-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-midnight">UGCraft</span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-violet-surface text-violet-brand border border-violet-200">
                  AI SaaS
                </span>
              </div>
              <p className="text-[10px] text-textMuted hidden sm:block font-medium">Authentic UGC Ad Generator</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-violet-surface text-violet-brand shadow-sm font-bold'
                      : 'text-textMuted hover:text-textPrimary hover:bg-black/5'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Key Status Pill */}
            <button
              onClick={onOpenKeyModal}
              title="Click to view Gemini API key status"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                apiKeyConfigured
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
              }`}
            >
              <Key className="h-3.5 w-3.5 shrink-0" />
              <span className="flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${apiKeyConfigured ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                {apiKeyConfigured ? 'Gemini 1.5 Active' : 'Configure API Key'}
              </span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => onNavigate('generator')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-brand to-violet-hover hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
            >
              <Wand2 className="h-3.5 w-3.5" />
              <span>Create Ad</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenKeyModal}
              className="p-1.5 rounded-lg border border-borderColor text-textMuted hover:bg-gray-100"
            >
              <Key className="h-4 w-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-textPrimary hover:bg-violet-surface transition"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-borderColor bg-white px-4 pt-3 pb-5 space-y-2 shadow-xl">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? 'bg-violet-surface text-violet-brand font-bold'
                    : 'text-textMuted hover:bg-gray-100 hover:text-textPrimary'
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-borderColor">
            <button
              onClick={() => {
                onNavigate('generator');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white bg-violet-brand hover:bg-violet-hover shadow"
            >
              <Wand2 className="h-4 w-4" />
              Create Campaign
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
