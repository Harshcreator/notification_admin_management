"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateNotificationForm } from "../components/CreateNotificationForm";
import { NotificationsList } from "../components/NotificationsList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Notification Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Notifications Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <NotificationsList />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Create Notification</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateNotificationForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}