# QR Code Generator Web App

Aplikasi web sederhana untuk menghasilkan QR Code dari URL menggunakan Next.js, Tailwind CSS, dan qrcode.react.

## Fitur

- ✨ Generate QR Code dari URL
- 📏 Kustomisasi ukuran QR Code
- 📥 Download QR Code sebagai PNG
- 📱 Responsive design (Mobile & Desktop)
- 🔍 Validasi URL
- 📖 Riwayat generate QR Code
- 💾 Penyimpanan lokal untuk riwayat

## Demo

[Link Demo Aplikasi](https://app-generateqrcode.vercel.app/)

## Teknologi yang Digunakan

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [qrcode.react](https://npmjs.com/package/qrcode.react)

## Cara Menjalankan Secara Lokal

1. Clone repository

```bash
git https://github.com/caksodig/app-generateqrcode.git
cd app-generateqrcode
```

2. Install dependencies

```bash
npm install
# atau
yarn install
```

3. Install shadcn/ui components yang diperlukan

```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add button
npx shadcn-ui@latest add alert
npx shadcn-ui@latest add select
```

4. Jalankan development server

```bash
npm run dev
# atau
yarn dev
```

5. Buka [http://localhost:3000](http://localhost:3000) di browser

## Struktur Proyek

```
qr-code-generator/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── QRCodeGenerator.tsx
├── public/
├── styles/
│   └── globals.css
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
```

## Deployment

Aplikasi ini bisa di-deploy menggunakan [Vercel](https://vercel.com) dengan langkah-langkah berikut:

1. Push kode ke GitHub repository
2. Buka [Vercel](https://vercel.com)
3. Import repository dari GitHub
4. Deploy

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file [LICENSE](LICENSE) untuk detail.
