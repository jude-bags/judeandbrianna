
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date to display in American format (Month Day, Year)
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Save RSVP data to localStorage
export function saveRSVP(data: any): void {
  const existingData = JSON.parse(localStorage.getItem('wedding-rsvps') || '[]');
  const newData = [...existingData, { ...data, timestamp: new Date().toISOString() }];
  localStorage.setItem('wedding-rsvps', JSON.stringify(newData));
}

// Get all RSVPs from localStorage
export function getRSVPs(): any[] {
  return JSON.parse(localStorage.getItem('wedding-rsvps') || '[]');
}
