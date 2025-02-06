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
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Scheduled For</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notifications.map((notification) => (
            <TableRow key={notification.id}>
              <TableCell>
                <Badge variant="outline">{notification.type}</Badge>
              </TableCell>
              <TableCell>{notification.title}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    notification.status === "delivered"
                      ? "success"
                      : notification.status === "failed"
                      ? "destructive"
                      : "default"
                  }
                >
                  {notification.status}
                </Badge>
              </TableCell>
              <TableCell>
                {notification.scheduledFor
                  ? format(new Date(notification.scheduledFor), "PPP")
                  : "Immediate"}
              </TableCell>
              <TableCell>
                {format(new Date(notification.createdAt), "PPP")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}