# Complaint System

A simple complaint submission system with email verification built with Next.js, TypeScript, Prisma, and Nodemailer.

## Features

- Complaint form with name, email, and complaint body
- Email verification system
- Automatic ticket number generation
- Internal notification emails
- User acknowledgement emails
- Clean, responsive UI with Tailwind CSS

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env`:
   ```
   DATABASE_URL="file:./dev.db"
   SMTP_HOST=your-smtp-host
   SMTP_PORT=587
   SMTP_USER=your-smtp-username
   SMTP_PASS=your-smtp-password
   EMAIL_FROM_NO_REPLY="no-reply@yourdomain.com"
   EMAIL_TO_INTERNAL="complaints@yourdomain.com"
   APP_BASE_URL="http://localhost:3000"
   ```

3. Set up the database:
   ```bash
   npm run db:generate
   npm run db:push
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Navigate to `/complaint` to submit a complaint
2. Check your email for the verification link
3. Click the verification link to finalize your complaint
4. Receive your ticket number and confirmation

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: Prisma + SQLite
- **Email**: Nodemailer
- **Authentication**: Custom token-based verification

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── complaints/
│   │       ├── route.ts
│   │       └── verify/
│   │           └── route.ts
│   ├── complaint/
│   │   ├── page.tsx
│   │   ├── success/
│   │   │   └── page.tsx
│   │   └── verify/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── lib/
    ├── email.ts
    ├── prisma.ts
    └── utils.ts
```

## API Endpoints

- `POST /api/complaints` - Submit a new complaint
- `POST /api/complaints/verify` - Verify a complaint with token

## Database Schema

The system uses a single `Complaint` table with the following fields:
- `id` - Unique identifier
- `name` - User's full name
- `email` - User's email address
- `body` - Complaint details
- `status` - Complaint status (PENDING/SUBMITTED)
- `ticketNumber` - Generated ticket number
- `verifyToken` - Unique verification token
- `verifyExp` - Token expiration date
- `createdAt` - Creation timestamp
