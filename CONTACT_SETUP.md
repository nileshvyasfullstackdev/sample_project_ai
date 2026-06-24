# Contact Form Setup Guide

## Overview

The contact form now includes:

- ✅ Client-side form validation
- ✅ Email submission to admin (jouweffoufebra-5896@yopmail.com)
- ✅ Confirmation email to customer
- ✅ In-memory storage of all submissions
- ✅ Admin submissions retrieval endpoint

## Features

### Frontend Validation

- **Name**: Minimum 2 characters required
- **Email**: Valid email format required
- **Subject**: Minimum 5 characters required
- **Message**: Minimum 10 characters required
- Real-time error clearing as user types
- Loading state with spinner during submission
- Toast notifications for success/error

### Backend Functionality

- Form data validation on server
- Sends admin notification email to `jouweffoufebra-5896@yopmail.com`
- Sends confirmation email to customer
- Stores all submissions in memory
- Admin can retrieve all submissions
- Admin can retrieve specific submission by ID

## Setup Instructions

### 1. Email Configuration (Gmail Recommended)

#### Step 1: Enable 2-Factor Authentication

1. Go to your Google Account: https://myaccount.google.com
2. Select "Security" from the left menu
3. Find "2-Step Verification" and enable it

#### Step 2: Generate App Password

1. Return to Security settings
2. Find "App passwords" (appears after enabling 2FA)
3. Select "Mail" and "Windows Computer" (or your device)
4. Google will generate a 16-character password
5. Copy this password (it will be something like: `abcd efgh ijkl mnop`)

#### Step 3: Update .env File

Edit `backend/.env`:

```
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
```

⚠️ **IMPORTANT**:

- Don't include spaces in the app password
- Never commit `.env` file to git
- Keep this file secure and private

### 2. Alternative Email Providers

#### Outlook/Hotmail

```
EMAIL_SERVICE=outlook
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

#### Yahoo Mail

```
EMAIL_SERVICE=yahoo
EMAIL_USER=your-email@yahoo.com
EMAIL_PASSWORD=your-password
```

#### Custom SMTP

```
EMAIL_SERVICE=your-smtp-service.com
EMAIL_USER=your-username
EMAIL_PASSWORD=your-password
```

### 3. Run the Application

```bash
# Terminal 1: Start Backend
npm run dev-backend

# Terminal 2: Start Frontend
npm run dev

# Or run both simultaneously
npm run dev-all
```

## API Endpoints

### Submit Contact Form

**POST** `/api/contact/submit`

Request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Product Inquiry",
  "message": "I have a question about your products..."
}
```

Response (Success):

```json
{
  "success": true,
  "message": "Thank you! Your message has been sent successfully.",
  "submissionId": 1234567890
}
```

Response (Error):

```json
{
  "error": "Invalid email format"
}
```

### Get All Submissions (Admin)

**GET** `/api/contact/submissions`

Response:

```json
{
  "total": 5,
  "submissions": [
    {
      "id": 1234567890,
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Product Inquiry",
      "message": "Message content...",
      "submittedAt": "2024-05-11T10:30:00.000Z"
    }
  ]
}
```

### Get Specific Submission

**GET** `/api/contact/submissions/:id`

Example: `GET /api/contact/submissions/1234567890`

## Email Templates

### Admin Email

The admin receives:

- Sender name and email
- Subject of inquiry
- Full message
- Timestamp of submission
- Submission ID for reference

### Customer Confirmation Email

The customer receives:

- Acknowledgment of message receipt
- Their submission details
- Promise of response
- Company contact information

## Testing

### Test Without Email Configuration

If email credentials are not set:

- Form still works and validates correctly
- Submissions are stored in memory
- No emails are sent (logged to console instead)
- Admin can still retrieve submissions

### Manual Testing

1. Fill out form with valid data
2. Click "Send Message"
3. Should see success toast notification
4. Form resets
5. Check admin email for contact form notification
6. Check customer email for confirmation

## Troubleshooting

### Email Not Sending

1. **Check .env file**
   - Verify EMAIL_USER and EMAIL_PASSWORD are correct
   - Remove spaces from password if using Gmail app password
   - Check NODE_ENV is not 'production'

2. **Gmail Issues**
   - Verify 2-Factor Authentication is enabled
   - Verify App Password (not regular password)
   - Check "Less secure app access" is allowed

3. **Check Backend Logs**
   - Look for error messages when submitting form
   - Server logs should show email sending attempt

### Form Not Submitting

1. Check browser console for JavaScript errors
2. Verify backend is running on port 5000
3. Verify `NEXT_PUBLIC_API_URL` in `.env.local` is correct
4. Check network tab in browser DevTools

### CORS Issues

- Verify `ALLOWED_ORIGINS` in `backend/.env`
- Should be `http://localhost:3000` for local development

## Security Considerations

⚠️ **Production Deployment**

1. Never expose `.env` file
2. Use environment variables from hosting provider
3. Implement rate limiting for form submissions
4. Add CAPTCHA for spam prevention
5. Implement proper authentication for admin endpoints
6. Use database instead of in-memory storage
7. Sanitize all inputs before storing

## File Structure

```
backend/
├── controllers/
│   └── contactController.js (NEW)
├── routes/
│   └── contact.js (NEW)
├── .env (NEW)
└── .env.example (UPDATED)

src/
├── app/
│   └── contact/
│       └── page.js (UPDATED)
└── utils/
    └── api.js (existing)

.env.local (existing)
```

## Next Steps

1. Update email credentials in `backend/.env`
2. Test the form locally
3. Deploy to production with proper environment variables
4. Add database for persistent storage (optional)
5. Add authentication for admin endpoints
6. Implement rate limiting and CAPTCHA
7. Set up email templates
8. Monitor form submissions

## Support

For issues or questions, refer to:

- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [Express.js Documentation](https://expressjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
