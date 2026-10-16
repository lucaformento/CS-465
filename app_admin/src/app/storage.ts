import { InjectionToken } from '@angular/core';

// Token that hands components the browser's localStorage
export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});
