"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updatePreferences } from "../lib/api";
import { NotificationPreferences } from "../types";

export function PreferencesForm() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: true,
    push: true,
    inApp: true,
    frequency: "immediate",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePreferences("current-user-id", preferences);
    } catch (error) {
      console.error('Failed to update preferences:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Email Notifications</label>
          <Switch
            checked={preferences.email}
            onCheckedChange={(checked) =>
              setPreferences((prev) => ({ ...prev, email: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Push Notifications</label>
          <Switch
            checked={preferences.push}
            onCheckedChange={(checked) =>
              setPreferences((prev) => ({ ...prev, push: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">In-app Notifications</label>
          <Switch
            checked={preferences.inApp}
            onCheckedChange={(checked) =>
              setPreferences((prev) => ({ ...prev, inApp: checked }))
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Notification Frequency</label>
          <Select
            value={preferences.frequency}
            onValueChange={(value: any) =>
              setPreferences((prev) => ({ ...prev, frequency: value }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immediate</SelectItem>
              <SelectItem value="daily">Daily Digest</SelectItem>
              <SelectItem value="weekly">Weekly Digest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Save Preferences
      </Button>
    </form>
  );
}