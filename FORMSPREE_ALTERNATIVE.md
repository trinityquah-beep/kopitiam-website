# 📧 Easier Alternative: Formspree Setup

If the Google Sheets setup is too complex, use **Formspree** - it's free and easier!

## **🚀 Quick Setup (5 minutes)**

### **Step 1: Create Formspree Account**
1. Go to: https://formspree.io
2. Sign up with Google (use `trinityquah@gmail.com`)
3. Verify your email

### **Step 2: Create Form**
1. Click "New Form"
2. **Form name:** "Kopitiam Reservations"
3. **Email to send to:** `trinityquah@gmail.com`
4. Click "Create Form"

### **Step 3: Get Your Form URL**
Copy the form URL (looks like: `https://formspree.io/f/xxxxxxxx`)

### **Step 4: Update JavaScript**
Open `/data/.openclaw/workspace/kopitiam-website/js/script.js`

Find this code (around line 230):
```javascript
const response = await fetch('https://script.google.com/macros/s/AKfycbw4Jp2tL8fRgJpBmzZvqXQ7hH9sV6KjYlQ3w5dN0/exec', {
```

Replace with:
```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    _subject: `New Reservation: ${formData.name} (${formData.people} pax)`,
    _replyto: formData.phone, // Using phone as contact
    _format: 'plain',
    name: formData.name,
    phone: formData.phone,
    people: formData.people,
    date: formData.date,
    time: formData.time,
    message: formData.message,
    timestamp: formData.timestamp
  })
});
```

### **Step 5: Test**
1. Submit the reservation form
2. Check email at `trinityquah@gmail.com`
3. Formspree also shows submissions in dashboard

## **✅ Advantages of Formspree:**
- **Free** for up to 50 submissions/month
- **No coding** required for backend
- **Email notifications** automatically
- **Spam protection** built-in
- **Dashboard** to view all submissions

## **📊 Formspree vs Google Sheets**

| Feature | Formspree | Google Sheets |
|---------|-----------|---------------|
| Setup Time | 5 minutes | 15-20 minutes |
| Email Notifications | ✅ Automatic | ✅ With script |
| Data Storage | Formspree dashboard | Google Sheets |
| Free Tier | 50 submissions/month | Unlimited |
| Customization | Limited | Full control |
| Learning Curve | Easy | Moderate |

## **🎯 Recommendation:**
**Start with Formspree** - it's easier and works immediately. You can switch to Google Sheets later if you need more control.

## **🔧 If Formspree Doesn't Work:**
1. Make sure you verified your email
2. Check Formspree dashboard for submissions
3. Try the Google Sheets method from `GOOGLE_SHEETS_SETUP.md`

---

**Formspree is the fastest way to get your reservation system working!** ⚡