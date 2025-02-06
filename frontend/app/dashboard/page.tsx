'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Bell } from 'lucide-react';

const socket = io('http://localhost:5000');

export default function NotificationsDashboard() {
    const [notifications, setNotifications] = useState<{ _id: string; type: string; message: string; status: string }[]>([]);
    const [unread, setUnread] = useState<any[]>([]);

    useEffect(() => {
        fetchNotifications();
        socket.on('notification', (notification) => {
            setUnread((prev) => [notification, ...prev]);
        });
    }, []);

    const fetchNotifications = async () => {
        const { data } = await axios.get('http://localhost:5000/api/notifications');
        setNotifications(data);
    };

    const markAsRead = (id: any) => {
        setUnread((prev) => prev.filter((n) => n._id !== id));
    };

    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Notifications Dashboard</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="ghost" className="relative">
                            <Bell />
                            {unread.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                                    {unread.length}
                                </span>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {unread.length > 0 ? (
                            unread.map((notification) => (
                                <DropdownMenuItem key={notification._id} onClick={() => markAsRead(notification._id)}>
                                    {notification.message}
                                </DropdownMenuItem>
                            ))
                        ) : (
                            <DropdownMenuItem>No new notifications</DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Message</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {notifications.map((notification) => (
                                <TableRow key={notification._id}>
                                    <TableCell>{notification.type}</TableCell>
                                    <TableCell>{notification.message}</TableCell>
                                    <TableCell>{notification.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
