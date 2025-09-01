# 🔑 Get Your Supabase Keys

## How to Get Your Supabase API Keys

1. **Go to your Supabase Dashboard**:
   - Navigate to: `https://supabase.com/dashboard/project/qnbqiljzyjcosfmumbqz`

2. **Get the API Keys**:
   - Go to **Settings** → **API**
   - Copy these two keys:

   **Project URL:**
   ```
   https://qnbqiljzyjcosfmumbqz.supabase.co
   ```

   **anon/public key:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuYnFpbGp6eWpjb3NmbXVtYnF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3NzQ4MDAsImV4cCI6MjA1MTM1MDgwMH0.YOUR_ACTUAL_ANON_KEY
   ```

   **service_role key:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuYnFpbGp6eWpjb3NmbXVtYnF6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTc3NDgwMCwiZXhwIjoyMDUxMzUwODAwfQ.YOUR_ACTUAL_SERVICE_ROLE_KEY
   ```

3. **Create your `.env` file** with these values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://qnbqiljzyjcosfmumbqz.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-actual-anon-key-here"
SUPABASE_SERVICE_ROLE_KEY="your-actual-service-role-key-here"

# App Configuration
APP_BASE_URL="http://localhost:3000"
```

## ⚠️ Important Security Notes

- **Never commit the `.env` file** to version control
- **The service_role key is sensitive** - keep it secure
- **The anon key is safe** to use in client-side code
- **Add `.env` to your `.gitignore`** file

## 🚀 Next Steps

1. Get your Gmail App Password (see `gmail-setup-guide.md`)
2. Configure Supabase SMTP settings
3. Deploy the Edge Function
4. Test the email functionality

Your Sterling Mutuals complaint system will be ready! 🎉
