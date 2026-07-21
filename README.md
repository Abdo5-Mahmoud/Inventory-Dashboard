# Inventory Management Dashboard

A modern inventory management dashboard built with Next.js 16, TypeScript, and Tailwind CSS. It enables businesses to manage products, track orders, and monitor sales performance through a responsive and intuitive interface.

![Next.js](https://img.shields.io/badge/Next.js-16.0.5-black?style=for-the-badge&logo=next.js)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1.17-black?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-black?style=for-the-badge&logo=typescript)
![DeployStatus](https://img.shields.io/badge/Deploy%20Status-success-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&logo=github)

> **Note:** This project uses DummyJSON as a mock backend API. Authentication and data are simulated for demonstration purposes.

## Live Demo

🌐 [Live Application](https://inventory-dashboard-beryl-zeta.vercel.app/login)

📂 [Source Code](https://github.com/Abdo5-Mahmoud/Inventory-Dashboard)

## Screenshots

![Login Page](./public/dashboard/0.png)
![Dashboard Page](./public/dashboard/1.png)
![Products Page](./public/dashboard/2.png)
![Product Details](./public/dashboard/3.png)
![Orders Page](./public/dashboard/4.png)

## Overview

This project is a modern inventory management dashboard built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**. It enables businesses to efficiently manage products, track orders, and monitor sales performance through an intuitive and responsive interface.

## Key Features

- **Complete Inventory Management**:
  - Create, read, update, and delete products
  - Advanced search and filtering
  - Product sorting
- **Order Tracking**:
  - View and manage orders
  - Order history
- **Business Analytics**:
  - Interactive charts with Recharts
  - Performance monitoring
  - Key metrics and insights
- **Modern User Experience**:
  - Responsive design for desktop and mobile
  - Loading, error, and empty states
  - Clean and intuitive interface

## Tech Stack

| Technology      | Version | Description                                        |
| --------------- | ------- | -------------------------------------------------- |
| Next.js 16      | 16.0.5  | App Router, Server Components, optimized rendering |
| TypeScript      | 5.9.3   | Type safety and maintainable code                  |
| Tailwind CSS    | 4.1.17  | Rapid UI development with utility-first styling    |
| TanStack Query  | -       | Efficient server-state management and caching      |
| React Hook Form | -       | Performant form handling                           |
| Zod             | -       | Runtime validation with TypeScript support         |
| Recharts        | -       | Interactive analytics and data visualization       |
| shadcn/ui       | -       | Accessible and reusable UI components              |

## Folder Structure

```text
app/
├── (auth)
│   ├── layout.tsx
│   └── login/
│       └── page.tsx
├── (dashboard)
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── page.tsx
│   ├── inventory/
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── orders/
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   ├── page
│   └── settings/
│       └── page.tsx

features/
├── auth/
├── products/
├── orders/

components/
hooks/
lib/
```

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/Abdo5-Mahmoud/Inventory-Dashboard.git
   ```

2. **Navigate to the project directory**

   ```bash
   cd Inventory-Dashboard
   ```

3. **Install dependencies**

   ```bash
   npm i
   ```

4. **Update API URL**
   Create a `.env.local` file in the root directory and add the following:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

## Challenges & Lessons Learned

One of the biggest challenges was understanding when to use **Server Components vs Client Components** in Next.js App Router. I learned to leverage server components for data fetching and rendering while using client components for interactive elements like forms and charts.

Integrating **TanStack Query with Server Components** while maintaining client-side synchronization was another challenge. I solved this by introducing a client wrapper responsible for managing React Query, allowing the surrounding layout to remain server-rendered.

## Author

**Abdullah Mahmoud Fawzy**

- [LinkedIn](https://www.linkedin.com/in/abdo-fwzy)
- [Email](mailto:[EMAIL_ADDRESS])
