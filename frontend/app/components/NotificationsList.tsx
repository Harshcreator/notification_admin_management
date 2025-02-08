"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { fetchNotifications } from "../lib/api";
import { Notification } from "../types";
import { format } from "date-fns";

export function NotificationsList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await fetchNotifications();
        console.log('Notifications data:', data);
        setNotifications(data);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    loadNotifications();
  }, []);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Recipients</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Scheduled Time</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notifications.map((notification) => (
            <TableRow key={notification.id ? `notification-${notification.id}` : undefined}>
              <TableCell>
                <Badge variant="outline">{notification.type}</Badge>
              </TableCell>
              <TableCell>{notification.recipients}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    notification.status === "sent"
                      ? "outline"
                      : notification.status === "failed"
                        ? "destructive"
                        : "default"
                  }
                >
                  {notification.status}
                </Badge>
              </TableCell>
              <TableCell>
                {notification.scheduledTime
                  ? format(new Date(notification.scheduledTime), "PPP")
                  : "Immediate"}
              </TableCell>
              <TableCell>
                {notification.createdAt
                  ? format(new Date(notification.createdAt), "PPP")
                  : "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}