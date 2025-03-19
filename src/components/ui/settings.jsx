import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Card } from "./card";
import { Separator } from "./separator";
import { useTheme } from "../../context/ThemeContext";

export function Settings({ isOpen, onClose }) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [settings, setSettings] = useState({
    theme: isDarkMode ? "dark" : "light",
    language: "en",
    fontSize: "medium",
    autoSave: true,
    maxTokens: 2000,
  });

  if (!isOpen) return null;

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setSettings({ ...settings, theme: newTheme });
    if (newTheme === "dark" && !isDarkMode) {
      toggleDarkMode();
    } else if (newTheme === "light" && isDarkMode) {
      toggleDarkMode();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-[500px] p-6 bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Settings</h2>
          <Button variant="ghost" onClick={onClose}>
            ✕
          </Button>
        </div>
        
        <Separator className="my-4" />

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Theme</label>
            <select
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              value={settings.theme}
              onChange={handleThemeChange}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Language</label>
            <select
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value })}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Font Size</label>
            <select
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              value={settings.fontSize}
              onChange={(e) => setSettings({ ...settings, fontSize: e.target.value })}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Max Tokens</label>
            <Input
              type="number"
              value={settings.maxTokens}
              onChange={(e) => setSettings({ ...settings, maxTokens: parseInt(e.target.value) })}
              min={100}
              max={4000}
              step={100}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="autoSave"
              checked={settings.autoSave}
              onChange={(e) => setSettings({ ...settings, autoSave: e.target.checked })}
            />
            <label htmlFor="autoSave" className="text-sm font-medium">
              Auto-save conversations
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => {
            // Save settings logic here
            onClose();
          }}>
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
} 