"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PreferencesForm } from "../components/PreferencesForm";

export default function Settings() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Notification Settings</h1>
      
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <PreferencesForm />
        </CardContent>
      </Card>
    </div>
  );
}