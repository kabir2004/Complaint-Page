# Environment Configuration for Sterling Mutuals Complaint System

## Required Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Database (Already configured with Supabase)
DATABASE_URL="postgresql://postgres:NelsonCheng%23123@db.qnbqiljzyjcosfmumbqz.supabase.co:5432/postgres"

# Resend Email Service (Recommended - Much easier than SMTP)
RESEND_API_KEY="your-resend-api-key-here"

# Email Configuration
EMAIL_FROM_NO_REPLY="Sterling Mutuals <complaints@sterlingmutuals.com>"
EMAIL_TO_INTERNAL="complaints@sterlingmutuals.com"
APP_BASE_URL="http://localhost:3000"

# Supabase Configuration (Optional - for advanced features)
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
```

## Setup Instructions

### 1. Resend Email Service (Recommended)

**Why Resend?**
- ✅ No SMTP configuration needed
- ✅ Better deliverability than Gmail SMTP
- ✅ Professional email templates
- ✅ Built-in analytics and tracking
- ✅ Free tier: 3,000 emails/month

**Setup Steps:**
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Go to API Keys section
4. Create a new API key
5. Copy the API key to your `.env` file as `RESEND_API_KEY`

**Domain Setup (Optional but Recommended):**
1. Add your domain (e.g., sterlingmutuals.com) in Resend dashboard
2. Add the required DNS records
3. Update `EMAIL_FROM_NO_REPLY` to use your domain

### 2. Alternative: Gmail SMTP (If you prefer)

If you want to stick with Gmail, you can use these settings:

```env
# Gmail SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password

# Note: You need to generate an App Password, not use your regular Gmail password
```

**Gmail App Password Setup:**
1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account → Security → 2-Step Verification → App passwords
3. Generate a new app password for "Mail"
4. Use this 16-character password (not your regular password)

### 3. Supabase Configuration (Optional)

If you want to use Supabase for additional features:

1. Go to your Supabase project dashboard
2. Go to Settings → API
3. Copy the Project URL and anon key
4. Add them to your `.env` file

## Testing Email Functionality

After setting up your environment variables:

1. Restart your development server: `npm run dev`
2. Submit a test complaint at `http://localhost:3000/complaint`
3. Check the console for email sending status
4. Verify emails are received

## Production Deployment

For production deployment (Vercel, Netlify, etc.):

1. Add the same environment variables to your deployment platform
2. Update `APP_BASE_URL` to your production domain
3. Consider using a custom domain for emails for better deliverability

## Troubleshooting

**Common Issues:**
- **"Invalid API key"**: Check your Resend API key is correct
- **"Domain not verified"**: Use a verified domain or Resend's default domain
- **"Rate limit exceeded"**: You've hit the free tier limit (3,000 emails/month)

**Need Help?**
- Check Resend documentation: https://resend.com/docs
- Check the console logs for detailed error messages
- Verify your environment variables are loaded correctly
