"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createNotification } from "../lib/api";
import { NotificationType } from "../types";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, set } from "date-fns";
import { CalendarIcon } from "lucide-react";

export function CreateNotificationForm() {
  const [date, setDate] = useState<Date>();
  const [type, setType] = useState<string>('');
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      if(!type) {
        alert('Please select a notification type');
        return;
      }

      await createNotification({
        ...data,
        type,
        scheduledTime: date,
        status: date ? 'pending' : 'sent',
        recipients: data.recipients.split(',').map((email: string) => email.trim()),
      });
      reset();
      setDate(undefined);
      setType('');
    } catch (error) {
      console.error('Failed to create notification:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Type</label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue placeholder="Select notification type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="push">Push</SelectItem>
            <SelectItem value="in-app">In-app</SelectItem>
          </SelectContent>
        </Select>
      </div>


      <div className="space-y-2">
        <label className="text-sm font-medium">Message</label>
        <Textarea {...register("message")} placeholder="Notification message" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Recipients</label>
        <Input {...register("recipients")} placeholder="Recipients (comma-separated)" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Schedule (Optional)</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button type="submit" className="w-full">Create Notification</Button>
    </form>
  );
}