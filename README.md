# Next.js + Electron Desktop App with Clean Architecture

Bu proje Next.js, React, Electron ve TypeScript kullanılarak Clean Architecture prensiplerine göre geliştirilmiş bir masaüstü uygulamasıdır.

## 🏗️ Mimari Yapı

Proje Clean Architecture prensiplerine göre 4 katmana ayrılmıştır:

### 1. **Domain Layer** (`src/core/domain/`)

- Entities: İş mantığını içeren domain nesneleri
- Interfaces: Repository arayüzleri
- Value Objects: Domain value nesneleri

### 2. **Application Layer** (`src/core/application/`)

- DTOs: Request/Response data transfer objects
- Use Cases: İş kurallarını uygulayan use case'ler
- Services: Uygulama servisleri

### 3. **Infrastructure Layer** (`src/core/infrastructure/`)

- Repositories: Domain repository implementasyonları
- API: External API iletişimi
- Storage: Veri depolama servisleri

### 4. **HTTP API Layer** (`src/core/http-api/`)

- Controllers: HTTP endpoint'leri ve request handling

## 📦 Kurulum

```bash
# Depoyu klonlayın
git clone <repo-url>
cd my-desktop-app

# Bağımlılıkları yükleyin
npm install
```

## 🚀 Kullanım

### Web Geliştirme Modu

```bash
npm run dev
```

Tarayıcıda http://localhost:3000 adresini açın.

### Electron Geliştirme Modu

```bash
npm run electron:dev
```

Hem Next.js development server'ı hem de Electron uygulaması başlatılır.

### Production Build

#### Web için:

```bash
npm run build:web
```

#### Desktop (Electron) için:

```bash
# Tüm platformlar için
npm run build:desktop

# Windows için
npm run electron:build:win

# macOS için
npm run electron:build:mac

# Linux için
npm run electron:build:linux
```

Build dosyaları `release/` klasöründe oluşturulacaktır.

## 🛠️ Teknolojiler

- **Next.js 15** - React framework
- **React 18** - UI library
- **Electron** - Desktop app framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **PrimeReact** - UI component library
- **PrimeFlex** - CSS utility library

## 📁 Proje Yapısı

```
my-desktop-app/
├── src/
│   ├── app/                    # Next.js App Router
│   ├── core/                   # Clean Architecture katmanları
│   │   ├── domain/            # Domain layer
│   │   ├── application/       # Application layer
│   │   ├── infrastructure/    # Infrastructure layer
│   │   └── http-api/          # HTTP API layer
│   ├── presentation/          # UI components & contexts
│   └── styles/               # Global styles
├── electron/                  # Electron main process
└── public/                   # Static assets
```

## 🎯 Özellikler

- ✅ Clean Architecture implementasyonu
- ✅ TypeScript full support
- ✅ Shared DTOs (Frontend & Backend)
- ✅ PrimeReact component library
- ✅ Tailwind CSS styling
- ✅ Electron desktop app
- ✅ Authentication context (boilerplate)
- ✅ Routing (Home, About Us, Projects)

## 📝 DTO Kullanımı

Bu projede DTOs (Data Transfer Objects) hem frontend hem de backend'de kullanılabilir:

```typescript
// src/core/application/dtos/requests/CreateUserRequestDto.ts
export interface CreateUserRequestDto {
  name: string;
  email: string;
  password: string;
}
```

Bu DTO'yu hem Next.js componentlerinde hem de backend API'de kullanabilirsiniz. .NET-Angular gibi ayrı ayrı tanımlamanıza gerek yoktur.

## 🔐 Authentication

`AuthProvider` context'i boilerplate olarak eklenmiştir. İhtiyacınıza göre authentication logic'i ekleyebilirsiniz:

```typescript
// src/presentation/contexts/AuthProvider.tsx
// Buraya login, logout, register gibi metodlar eklenebilir
```

## 🎨 Tema Özelleştirme

PrimeReact teması `src/app/globals.css` dosyasında değiştirilebilir:

```css
/* Lara Light Blue tema kullanılıyor */
@import "primereact/resources/themes/lara-light-blue/theme.css";

/* Diğer temalar:
- lara-dark-blue
- lara-light-indigo
- material-light
- bootstrap4-light-blue
*/
```

## 📚 Daha Fazla Bilgi

- [Next.js Dokümantasyonu](https://nextjs.org/docs)
- [Electron Dokümantasyonu](https://www.electronjs.org/docs)
- [PrimeReact Dokümantasyonu](https://primereact.org/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## 📄 Lisans


