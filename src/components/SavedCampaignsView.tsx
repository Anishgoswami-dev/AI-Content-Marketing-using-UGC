import React, { useState } from 'react';
import {
  FolderGit2,
  Search,
  Filter,
  Clock,
  Trash2,
  Copy,
  Edit2,
  Download,
  ArrowRight,
  Sparkles,
  Layers,
  Wand2
} from 'lucide-react';
import { GeneratedCampaign, BusinessCategory, PlatformType } from '../types/campaign';
import { storageService } from '../services/storageService';

interface SavedCampaignsViewProps {
  campaigns: GeneratedCampaign[];
  onOpenCampaign: (campaign: GeneratedCampaign) => void;
  onRefreshCampaigns: () => void;
  onNewCampaign: () => void;
}

export const SavedCampaignsView: React.FC<SavedCampaignsViewProps> = ({
  campaigns,
  onOpenCampaign,
  onRefreshCampaigns,
  onNewCampaign,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');

  const filteredCampaigns = campaigns.filter(c => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.inputs.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.inputs.productName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || c.inputs.category === selectedCategory;
    const matchesPlatform = selectedPlatform === 'All' || c.inputs.platform === selectedPlatform;

    return matchesSearch && matchesCategory && matchesPlatform;
  });

  const handleDelete = (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    if (window.confirm(`Delete campaign "${title}" permanently?`)) {
      storageService.deleteCampaign(id);
      onRefreshCampaigns();
    }
  };

  const handleDuplicate = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    storageService.duplicateCampaign(id);
    onRefreshCampaigns();
  };

  const handleStartRename = (e: React.MouseEvent, id: string, currentTitle: string) => {
    e.stopPropagation();
    setRenamingId(id);
    setNewTitle(currentTitle);
  };

  const handleSaveRename = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (newTitle.trim()) {
      storageService.renameCampaign(id, newTitle.trim());
      onRefreshCampaigns();
    }
    setRenamingId(null);
  };

  const handleExport = (e: React.MouseEvent, c: GeneratedCampaign) => {
    e.stopPropagation();
    const md = storageService.exportToMarkdown(c);
    storageService.downloadFile(md, `${c.inputs.brandName.toLowerCase()}_campaign.md`, 'text/markdown');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-borderColor">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-surface text-violet-brand text-xs font-bold mb-2">
            <FolderGit2 className="h-3.5 w-3.5" />
            <span>Campaign Repository ({campaigns.length})</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-midnight">
            My UGC Campaigns
          </h1>
          <p className="text-xs sm:text-sm text-textMuted mt-1">
            Browse, manage, duplicate, and export locally stored ad packages.
          </p>
        </div>

        <button
          onClick={onNewCampaign}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-violet-brand hover:bg-violet-hover transition shadow-sm"
        >
          <Wand2 className="h-3.5 w-3.5" />
          <span>New Campaign</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-borderColor bg-white p-4 shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="h-4 w-4 text-textMuted absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by brand, product or title..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-borderColor bg-[#FAF9FD] text-xs focus:ring-2 focus:ring-violet-brand/20 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-borderColor bg-[#FAF9FD] text-xs focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Beauty and Skincare">Beauty &amp; Skincare</option>
            <option value="Local Business">Local Business</option>
            <option value="D2C / E-commerce">D2C / E-commerce</option>
            <option value="SaaS / Technology">SaaS / Technology</option>
            <option value="Fitness and Wellness">Fitness &amp; Wellness</option>
            <option value="Fashion">Fashion</option>
          </select>

          <select
            value={selectedPlatform}
            onChange={e => setSelectedPlatform(e.target.value)}
            className="px-3 py-2 rounded-xl border border-borderColor bg-[#FAF9FD] text-xs focus:outline-none"
          >
            <option value="All">All Platforms</option>
            <option value="Instagram Reels">Instagram Reels</option>
            <option value="Facebook Ads">Facebook Ads</option>
            <option value="YouTube Shorts">YouTube Shorts</option>
            <option value="Multi-platform campaign">Multi-platform</option>
          </select>
        </div>
      </div>

      {/* Campaigns Grid */}
      {filteredCampaigns.length === 0 ? (
        <div className="rounded-2xl border border-borderColor bg-white p-12 text-center text-textMuted shadow-sm">
          <p className="text-sm font-semibold">No campaigns matched your search or filters.</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedPlatform('All'); }}
            className="mt-3 text-xs font-bold text-violet-brand hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map(c => (
            <div
              key={c.id}
              onClick={() => onOpenCampaign(c)}
              className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm hover:border-violet-300 hover:shadow-card cursor-pointer transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-violet-surface text-violet-brand px-2 py-0.5 rounded">
                    {c.inputs.category}
                  </span>
                  {c.isDemo && (
                    <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200">
                      Demo Mode
                    </span>
                  )}
                </div>

                {renamingId === c.id ? (
                  <div className="flex items-center gap-2 mb-2" onClick={e => e.stopPropagation()}>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={e => setNewTitle(e.target.value)}
                      className="w-full p-1 text-sm font-bold border border-violet-brand rounded focus:outline-none"
                      autoFocus
                    />
                    <button
                      onClick={e => handleSaveRename(e, c.id)}
                      className="px-2 py-1 text-xs font-bold text-white bg-violet-brand rounded"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <h3 className="text-base font-bold text-midnight mb-1 line-clamp-1 hover:text-violet-brand transition">
                    {c.title}
                  </h3>
                )}

                <p className="text-xs text-textMuted mb-4">
                  <strong>Product:</strong> {c.inputs.productName}
                </p>

                <div className="space-y-1 text-xs text-textPrimary mb-6">
                  <p className="text-textMuted">
                    <strong>Platform:</strong> {c.inputs.platform} • {c.inputs.duration}
                  </p>
                  <p className="text-textMuted">
                    <strong>Deliverables:</strong> {c.hooks.length} Hooks, {c.scripts.length} Scripts
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-borderColor flex items-center justify-between text-xs">
                <span className="text-[11px] text-textMuted flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(c.createdAt).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={e => handleStartRename(e, c.id, c.title)}
                    title="Rename"
                    className="p-1.5 rounded-lg text-textMuted hover:bg-gray-100 transition"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={e => handleDuplicate(e, c.id)}
                    title="Duplicate"
                    className="p-1.5 rounded-lg text-textMuted hover:bg-violet-surface hover:text-violet-brand transition"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={e => handleExport(e, c)}
                    title="Export Markdown"
                    className="p-1.5 rounded-lg text-textMuted hover:bg-gray-100 transition"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={e => handleDelete(e, c.id, c.title)}
                    title="Delete"
                    className="p-1.5 rounded-lg text-textMuted hover:bg-red-50 hover:text-red-600 transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
