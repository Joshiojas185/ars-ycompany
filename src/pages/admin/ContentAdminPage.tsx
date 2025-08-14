import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Plus, Trash2 } from 'lucide-react';

export function ContentAdminPage() {
  const { state, dispatch } = useApp();
  const [localConfig, setLocalConfig] = useState(() => {
    const map: Record<string, string> = {};
    state.contentConfig.forEach(c => { map[c.key] = c.value; });
    return map;
  });

  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleChange = (key: string, value: string) => {
    setLocalConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    Object.entries(localConfig).forEach(([key, value]) => {
      dispatch({ type: 'UPDATE_CONTENT_CONFIG', payload: { key, value, updatedBy: state.currentUser?.email || 'system' } });
    });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { message: 'Content updated successfully', type: 'success', read: false } });
  };

  const addKey = () => {
    if (!newKey.trim()) return;
    if (state.contentConfig.find(c => c.key === newKey)) return;
    dispatch({ type: 'ADD_CONTENT_CONFIG', payload: {
      id: Math.random().toString(36).substr(2,9),
      key: newKey,
      value: newValue,
      description: 'Custom content key',
      category: 'ui_text',
      isActive: true,
      updatedBy: state.currentUser?.email || 'system',
      updatedAt: new Date().toISOString(),
    }});
    setLocalConfig(prev => ({ ...prev, [newKey]: newValue }));
    setNewKey('');
    setNewValue('');
  };

  const removeKey = (key: string) => {
    dispatch({ type: 'REMOVE_CONTENT_CONFIG', payload: key });
    const { [key]: _, ...rest } = localConfig;
    setLocalConfig(rest);
  };

  const commonKeys = [
    'hotels_label',
    'cars_label',
    'welcome_message',
    'footer_tagline',
    'search_placeholder_hotels',
    'search_placeholder_cars',
    'booking_success_message'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-3 mb-6">
          <Settings className="h-8 w-8 text-purple-600" />
          <h1 className="text-2xl font-bold text-gray-900">Content Administration</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Common Fields</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commonKeys.map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{key}</label>
                  <input type="text" value={localConfig[key] || ''} onChange={(e) => handleChange(key, e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">All Content Keys</h2>
            <div className="space-y-3">
              {state.contentConfig.map((c) => (
                <div key={c.key} className="flex items-center space-x-2">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500">{c.key}</label>
                    <input type="text" value={localConfig[c.key] ?? c.value} onChange={(e) => handleChange(c.key, e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                  </div>
                  <button onClick={() => removeKey(c.key)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Add New Content Key</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input placeholder="key (e.g., header_title)" value={newKey} onChange={(e) => setNewKey(e.target.value)} className="px-3 py-2 border rounded" />
              <input placeholder="value" value={newValue} onChange={(e) => setNewValue(e.target.value)} className="px-3 py-2 border rounded" />
              <button onClick={addKey} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded flex items-center justify-center">
                <Plus className="h-4 w-4 mr-1" /> Add
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={handleSave} className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
