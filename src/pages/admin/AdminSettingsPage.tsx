import { useState, useEffect } from 'react';
import { Save, CheckCircle } from 'lucide-react';
import { useSiteSettings } from '../../hooks/useSanity';
import { client } from '../../lib/sanity';
import { SiteSettings } from '../../types';

export default function AdminSettingsPage() {
  const { settings, loading } = useSiteSettings();
  const [formData, setFormData] = useState<SiteSettings | null>(null);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading && settings) {
      setFormData(settings);
    }
  }, [settings, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    setIsSaving(true);

    try {
      // Assuming a singleton pattern with a fixed ID 'siteSettings'
      const docId = 'siteSettings';
      await client.createIfNotExists({ _id: docId, _type: 'siteSettings', ...formData });
      await client.patch(docId).set(formData).commit();

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving settings to Sanity:', error);
      alert('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: keyof SiteSettings, value: string) => {
    if (!formData) return;
    setFormData(prev => prev ? ({ ...prev, [field]: value }) : null);
    setSaved(false);
  };

  if (loading || !formData) {
    return (
      <div className="animate-fade-in-up">
        <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm shadow-gray-200/10 p-8 text-center text-[#6E6E73] animate-pulse font-medium">
          Loading settings...
        </div>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 border border-gray-200 bg-white text-[#1D1D1F] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#007AFF] transition-all duration-200";
  const labelClass = "block text-[11px] font-bold text-[#1D1D1F] uppercase tracking-wider mb-1.5";

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] font-display tracking-tight">
          Settings
        </h1>
        <p className="text-[#6E6E73] text-sm font-medium mt-1">
          Configure your publication settings
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm shadow-gray-200/10 p-6">
          <h3 className="text-base sm:text-lg font-extrabold text-[#0A2540] font-display tracking-tight mb-5">
            General Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Publication Name</label>
              <input
                type="text"
                value={formData.publicationName}
                onChange={(e) => handleChange('publicationName', e.target.value)}
                className={inputClass}
                id="settings-pubName"
              />
            </div>
            <div>
              <label className={labelClass}>Logo Text</label>
              <input
                type="text"
                value={formData.logoText}
                onChange={(e) => handleChange('logoText', e.target.value)}
                className={inputClass}
                id="settings-logoText"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm shadow-gray-200/10 p-6">
          <h3 className="text-base sm:text-lg font-extrabold text-[#0A2540] font-display tracking-tight mb-5">
            Contact Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>WhatsApp Number (with country code)</label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                className={inputClass}
                placeholder="918331823668"
                id="settings-whatsapp"
              />
              <p className="text-xs text-gray-400 mt-1.5">Format: country code + number (e.g., 918331823668)</p>
            </div>
            <div>
              <label className={labelClass}>Contact Email</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                className={inputClass}
                id="settings-email"
              />
            </div>
            <div>
              <label className={labelClass}>Address</label>
              <textarea
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                rows={3}
                className={`${inputClass} resize-none`}
                id="settings-address"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-[#007AFF] hover:bg-blue-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/15 hover:shadow-xl transition-all duration-200"
            id="settings-save"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
          </button>

          {saved && (
            <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold animate-fade-in">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Settings saved successfully!</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
