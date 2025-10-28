// Basit Local Storage servisi
export class LocalStorageService {
  static set<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }

  static get<T>(key: string): T | null {
    if (typeof window === "undefined") return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  }

  static remove(key: string): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  }

  static clear(): void {
    if (typeof window === "undefined") return;
    localStorage.clear();
  }
}
