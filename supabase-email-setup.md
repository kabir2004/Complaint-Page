# 🚀 Supabase Email Setup for Sterling Mutuals

## Overview
This setup uses Supabase's built-in email functionality with custom SMTP configuration, providing a robust and scalable email solution for your complaint management system.

## 🎯 What's Been Set Up

✅ **Supabase Edge Function** - Custom email sending function  
✅ **Email Service Integration** - Updated to use Supabase  
✅ **Professional Email Templates** - Sterling Mutuals branded emails  
✅ **Database Logging** - All emails logged to your database  

## 📋 Setup Instructions

### Step 1: Configure Supabase Custom SMTP

1. **Go to your Supabase Dashboard**
   - Navigate to: `https://supabase.com/dashboard/project/qnbqiljzyjcosfmumbqz`
   - Go to **Authentication** → **Settings** → **Email**

2. **Enable Custom SMTP**
   - Turn **"Customize email provider"** ON
   - Fill in your SMTP details:

   | Field | Value | Description |
   |-------|-------|-------------|
   | SMTP host | `smtp.gmail.com` | Gmail SMTP server |
   | SMTP port | `587` | STARTTLS port |
   | SMTP user | `your-email@gmail.com` | Your Gmail address |
   | SMTP password | `your-app-password` | Gmail App Password (not regular password) |
   | From name | `Sterling Mutuals` | Display name |
   | From address | `complaints@sterlingmutuals.com` | Your email address |
   | Secure connection | `STARTTLS` | Match port 587 |

3. **Save the settings**

### Step 2: Set Up Gmail App Password (If using Gmail)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Generate new app password for "Mail"
   - Use this 16-character password (not your regular password)

### Step 3: Deploy the Edge Function

1. **Install Supabase CLI** (if not already installed):
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase:**
   ```bash
   supabase login
   ```

3. **Link your project:**
   ```bash
   supabase link --project-ref qnbqiljzyjcosfmumbqz
   ```

4. **Deploy the email function:**
   ```bash
   supabase functions deploy send-email
   ```

### Step 4: Set Environment Variables

In your Supabase Dashboard → Settings → Functions → Environment Variables, add:

| Variable | Value | Purpose |
|----------|-------|---------|
| `SMTP_HOST` | `smtp.gmail.com` | SMTP server hostname |
| `SMTP_PORT` | `587` | SMTP port |
| `SMTP_SECURE` | `false` | TLS/SSL flag |
| `SMTP_USER` | `your-email@gmail.com` | Auth username |
| `SMTP_PASS` | `your-app-password` | Auth password |
| `SMTP_FROM_NAME` | `Sterling Mutuals` | From display name |
| `SMTP_FROM_ADDRESS` | `complaints@sterlingmutuals.com` | From email address |

### Step 5: Update Your Local Environment

Create a `.env` file in your project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://qnbqiljzyjcosfmumbqz.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# App Configuration
APP_BASE_URL="http://localhost:3000"
```

## 🧪 Testing the Setup

1. **Restart your development server:**
   ```bash
   npm run dev
   ```

2. **Submit a test complaint:**
   - Go to `http://localhost:3000/complaint`
   - Fill out the form and submit
   - Check the console for email sending status

3. **Check Supabase logs:**
   - Go to Supabase Dashboard → Logs
   - Filter by `function=send-email` to see email function logs

## 🎨 Email Templates

The system includes three professional email templates:

1. **Verification Email** - Sent when complaint is submitted
2. **Internal Notification** - Sent to your team when new complaint arrives
3. **Acknowledgement Email** - Sent after complaint is verified

All emails feature:
- ✅ Sterling Mutuals branding
- ✅ Professional HTML design
- ✅ Responsive layout
- ✅ Clear call-to-action buttons
- ✅ Company contact information

## 🔧 Alternative SMTP Providers

If you prefer not to use Gmail, here are other options:

### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

### Mailgun
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your-mailgun-smtp-username
SMTP_PASS=your-mailgun-smtp-password
```

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-outlook-email
SMTP_PASS=your-outlook-password
```

## 🚨 Troubleshooting

### Common Issues:

**"Invalid login" Error:**
- ✅ Use App Password, not regular Gmail password
- ✅ Ensure 2FA is enabled on Gmail
- ✅ Check SMTP credentials in Supabase dashboard

**"Function not found" Error:**
- ✅ Deploy the Edge Function: `supabase functions deploy send-email`
- ✅ Check function name matches exactly

**"Environment variables not found":**
- ✅ Set variables in Supabase Dashboard → Settings → Functions → Environment Variables
- ✅ Restart your development server after changes

### Debug Steps:

1. **Check Supabase logs:**
   - Dashboard → Logs → filter by function name

2. **Test SMTP connection:**
   ```bash
   telnet smtp.gmail.com 587
   ```

3. **Verify environment variables:**
   - Check they're set in Supabase dashboard
   - Ensure no typos in variable names

## 🎉 Benefits of This Setup

- ✅ **No SMTP headaches** - Supabase handles the complexity
- ✅ **Scalable** - Handles high email volumes
- ✅ **Reliable** - Built on Supabase's infrastructure
- ✅ **Professional** - Custom branded email templates
- ✅ **Trackable** - All emails logged to database
- ✅ **Secure** - Credentials stored securely in Supabase

## 📞 Need Help?

If you encounter any issues:
1. Check the Supabase logs first
2. Verify your SMTP credentials
3. Ensure the Edge Function is deployed
4. Test with a simple email first

Your Sterling Mutuals complaint system is now ready with professional email functionality! 🚀
