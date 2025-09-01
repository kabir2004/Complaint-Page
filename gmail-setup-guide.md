# 📧 Gmail Setup for Sterling Mutuals - complaintssterling@gmail.com

## 🎯 Quick Setup Steps

### Step 1: Generate Gmail App Password

1. **Go to your Gmail account** (`complaintssterling@gmail.com`)
2. **Enable 2-Factor Authentication** (if not already enabled):
   - Go to [myaccount.google.com](https://myaccount.google.com)
   - Security → 2-Step Verification → Turn on
3. **Generate App Password**:
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" as the app
   - Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

### Step 2: Configure Supabase SMTP

1. **Go to Supabase Dashboard**:
   - Navigate to: `https://supabase.com/dashboard/project/qnbqiljzyjcosfmumbqz`
   - Go to **Authentication** → **Settings** → **Email**

2. **Enable Custom SMTP**:
   - Turn **"Customize email provider"** ON
   - Fill in these exact values:

   | Field | Value |
   |-------|-------|
   | SMTP host | `smtp.gmail.com` |
   | SMTP port | `587` |
   | SMTP user | `complaintssterling@gmail.com` |
   | SMTP password | `your-16-character-app-password` |
   | From name | `Sterling Mutuals` |
   | From address | `complaintssterling@gmail.com` |
   | Secure connection | `STARTTLS` |

3. **Save the settings**

### Step 3: Deploy the Edge Function

Run these commands in your terminal:

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref qnbqiljzyjcosfmumbqz

# Deploy the email function
supabase functions deploy send-email
```

### Step 4: Set Environment Variables in Supabase

In your Supabase Dashboard → Settings → Functions → Environment Variables, add:

| Variable | Value |
|----------|-------|
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_SECURE` | `false` |
| `SMTP_USER` | `complaintssterling@gmail.com` |
| `SMTP_PASS` | `your-16-character-app-password` |
| `SMTP_FROM_NAME` | `Sterling Mutuals` |
| `SMTP_FROM_ADDRESS` | `complaintssterling@gmail.com` |

### Step 5: Create Local Environment File

Create a `.env` file in your project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://qnbqiljzyjcosfmumbqz.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"

# App Configuration
APP_BASE_URL="http://localhost:3000"
```

## 🧪 Testing the Setup

1. **Restart your development server**:
   ```bash
   npm run dev
   ```

2. **Submit a test complaint**:
   - Go to `http://localhost:3000/complaint`
   - Fill out the form with your email (`complaintssterling@gmail.com`)
   - Submit the complaint
   - Check your Gmail inbox for the verification email

3. **Check the console** for email sending status

## 📧 Email Flow

When someone submits a complaint:

1. **Verification Email** → Sent to the complainant's email
2. **Internal Notification** → Sent to `complaintssterling@gmail.com`
3. **Acknowledgement Email** → Sent after verification

## 🔧 Troubleshooting

### Common Issues:

**"Invalid login" Error:**
- ✅ Make sure you're using the App Password, not your regular Gmail password
- ✅ Ensure 2FA is enabled on the Gmail account
- ✅ Check that the App Password is exactly 16 characters

**"Function not found" Error:**
- ✅ Deploy the Edge Function: `supabase functions deploy send-email`
- ✅ Check that the function name matches exactly

**"Environment variables not found":**
- ✅ Set variables in Supabase Dashboard → Settings → Functions → Environment Variables
- ✅ Restart your development server after changes

### Debug Steps:

1. **Check Supabase logs**:
   - Dashboard → Logs → filter by `function=send-email`

2. **Test SMTP connection**:
   ```bash
   telnet smtp.gmail.com 587
   ```

3. **Verify Gmail settings**:
   - Make sure "Less secure app access" is OFF (we're using App Passwords)
   - Ensure 2FA is enabled

## 🎉 What You'll Get

- ✅ **Professional emails** from `Sterling Mutuals <complaintssterling@gmail.com>`
- ✅ **Beautiful HTML templates** with Sterling Mutuals branding
- ✅ **Automatic email logging** to your database
- ✅ **Reliable delivery** through Gmail's SMTP servers
- ✅ **Secure authentication** using App Passwords

## 📞 Need Help?

If you encounter any issues:
1. Check the Supabase logs first
2. Verify your Gmail App Password is correct
3. Ensure the Edge Function is deployed
4. Test with a simple email first

Your Sterling Mutuals complaint system is now ready with Gmail email functionality! 🚀
