# WDD430-Team04-Project: Handcrafted Haven
Team project repo for WDD430


# App Structure
- `app/`
  - Contains application
- `app/products/`
  - Product page
- `app/sellers/`
  - Sellers page
- `app/profile`
  - User Profile page
- `app/ui/`
  - User interface modules/css styling
- `app/api/`
  - Api routing
- `controllers/`
  - Routing callback functions
- `models/`
  - Database CRUD functions
- `lib/`
  - Database initialization/connection
```plain
.
├── app/
│   ├── page.jsx
│   ├── products/
│   │   └── page.jsx
│   ├── sellers/
│   ├── profile/
│   ├── ui/
│   │   └── global.css
│   └── api/
│       ├── products/
│       │   └── route.js
│       ├── reviews/
│       │   └── route.js
│       └── sellers/
│           └── route.js
│
├── controllers/
│   ├── productController.js
│   ├── reviewController.js
│   └── sellerController.js
│
├── models/
│   ├── productModel.js
│   ├── reviewModel.js
│   ├── sellerModel.js
│   └── userModel.js
│
└── lib/
    └── db.js
```

## Team members
- Robbie Yamashita


# Next.js README Documentation

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


