import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to the Notification System
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Manage all your notifications in one place. Access the admin dashboard or
          update your notification preferences.
        </p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/admin">Admin Dashboard</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/settings">Notification Settings</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}