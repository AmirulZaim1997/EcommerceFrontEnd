import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Get item from localStorage
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  // Set item to localStorage
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  // Remove item from localStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all items from localStorage
  clear(): void {
    localStorage.clear();
  }
}
