# 📋 Google Sheets & Email Setup for Reservation System

This guide will help you set up the backend for your reservation system. The form will save data to Google Sheets and send email notifications.

## **📊 Part 1: Create Google Sheet**

1. **Go to:** https://sheets.google.com
2. **Create new spreadsheet:** Name it "Kopitiam Reservations"
3. **Set up columns:** In row 1, add these headers:
   - A: Timestamp
   - B: Name
   - C: Contact Number
   - D: Number of People
   - E: Date
   - F: Time Slot
   - G: Special Requests
   - H: Status (will auto-fill as "New")

4. **Share the sheet:**
   - Click "Share" button
   - Change to "Anyone with the link" → "Editor"
   - Copy the sharing link

## **🚀 Part 2: Create Google Apps Script**

1. **Open the sheet** → **Extensions** → **Apps Script**
2. **Delete any existing code** and paste this:

```javascript
// Google Apps Script for Kopitiam Reservation System
// Saves to Google Sheets and sends email notification

const SHEET_NAME = "Kopitiam Reservations";
const EMAIL_TO = "trinityquah@gmail.com";
const EMAIL_SUBJECT = "New Kopitiam Reservation";

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    // Prepare row data
    const timestamp = new Date();
    const rowData = [
      timestamp,
      data.name,
      data.phone,
      data.people,
      data.date,
      data.time,
      data.message || "(None)",
      "New"
    ];
    
    // Append to sheet
    sheet.appendRow(rowData);
    
    // Format the new row
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, 8).setBackground("#E8F5E9"); // Light green
    
    // Send email notification
    sendEmailNotification(data, timestamp);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: "Reservation saved" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendEmailNotification(data, timestamp) {
  try {
    // Format date for display
    const dateObj = new Date(data.date);
    const formattedDate = dateObj.toLocaleDateString('en-MY', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Create email body
    const emailBody = `
🎉 NEW KOPITIAM RESERVATION 🎉

📅 **Reservation Details:**
• Name: ${data.name}
• Contact: ${data.phone}
• Guests: ${data.people} people
• Date: ${formattedDate}
• Time: ${data.time}
• Special Requests: ${data.message || "None"}

⏰ **Submitted:** ${timestamp.toLocaleString('en-MY')}

📍 **Kopitiam Rasa**
18 Jalan Klang Sentral 2/KU5, Klang, Selangor

---
This reservation was submitted via the Kopitiam Rasa website.
Please contact the customer to confirm availability.
    `;
    
    // Send email
    MailApp.sendEmail({
      to: EMAIL_TO,
      subject: `${EMAIL_SUBJECT} - ${data.name} (${data.people} pax)`,
      body: emailBody
    });
    
  } catch (error) {
    console.error("Email error:", error);
    // Continue even if email fails
  }
}

// Test function (run this once to set up)
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "Timestamp", 
      "Name", 
      "Contact Number", 
      "Number of People", 
      "Date", 
      "Time Slot", 
      "Special Requests",
      "Status"
    ]);
    
    // Format header
    const headerRange = sheet.getRange(1, 1, 1, 8);
    headerRange.setBackground("#8B4513");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    
    // Set column widths
    sheet.setColumnWidth(1, 180); // Timestamp
    sheet.setColumnWidth(2, 150); // Name
    sheet.setColumnWidth(3, 150); // Contact
    sheet.setColumnWidth(4, 120); // People
    sheet.setColumnWidth(5, 120); // Date
    sheet.setColumnWidth(6, 150); // Time
    sheet.setColumnWidth(7, 250); // Message
    sheet.setColumnWidth(8, 100); // Status
  }
  
  console.log("Setup complete!");
}
```

3. **Save the script:** Click the floppy disk icon or press Ctrl+S
4. **Name the project:** "Kopitiam Reservation System"

## **🔧 Part 3: Deploy as Web App**

1. **Click "Deploy"** → **"New deployment"**
2. **Select type:** "Web app"
3. **Configuration:**
   - **Description:** Kopitiam Reservation API
   - **Execute as:** "Me" (your email)
   - **Who has access:** "Anyone" (important!)
4. **Click "Deploy"**
5. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/.../exec`)

## **🔗 Part 4: Update JavaScript File**

1. **Open:** `/data/.openclaw/workspace/kopitiam-website/js/script.js`
2. **Find line ~230:** Look for the fetch URL
3. **Replace the URL** with your Web App URL:
   ```javascript
   const response = await fetch('YOUR_WEB_APP_URL_HERE', {
   ```

## **✅ Part 5: Test the System**

1. **Run setup function:**
   - In Apps Script editor, select `setup` function
   - Click "Run" (▶️ button)
   - Authorize when prompted

2. **Test the form:**
   - Open your website
   - Go to Reservation section
   - Fill out the form
   - Submit

3. **Check:**
   - Google Sheet should have new row
   - Email should arrive at `trinityquah@gmail.com`

## **🔒 Part 6: Security Notes**

1. **Google Sheet permissions:** Keep as "Anyone with link can edit" for the script to work
2. **Web App URL:** Don't share publicly (but it's okay since it's on your public website)
3. **Email limits:** Google Apps Script has daily email sending limits (100 recipients/day for free)

## **🛠️ Troubleshooting**

### **Form not submitting:**
- Check browser console for errors (F12 → Console)
- Verify Web App URL is correct
- Make sure Web App is deployed to "Anyone"

### **No email received:**
- Check spam folder
- Verify `EMAIL_TO` is correct in script
- Check Apps Script execution logs

### **Sheet not updating:**
- Run `setup()` function again
- Check sheet name matches `SHEET_NAME`
- Verify script has edit permissions on sheet

## **📞 Support**
If you get stuck, you can:
1. Use a simpler form service like Formspree or FormSubmit
2. Contact for help with the setup
3. Use the phone reservation method as backup

---

**Your reservation system will be ready once you complete these steps!** 🎯