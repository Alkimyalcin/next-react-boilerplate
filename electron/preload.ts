import { contextBridge } from "electron";

// Electron API'lerini expose et
contextBridge.exposeInMainWorld("electron", {
  // Gelecekte ihtiyaç duyulabilecek API'ler buraya eklenebilir
  platform: process.platform,
});
