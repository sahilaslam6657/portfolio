# Google Calendar Booking Backend Setup

This backend lets your portfolio scheduler:
- load available slots in real time
- book meetings directly into Google Calendar
- let admin add and remove slots

## 1) Create Google Apps Script project

1. Open Google Drive and create a new Google Sheet.
2. Open Extensions > Apps Script.
3. Replace the default file with the content of Code.gs.
4. Save the project.

## 2) Configure script properties

In Apps Script:
1. Open Project Settings.
2. Under Script Properties, add:
- ADMIN_TOKEN: a strong private token for admin slot management
- CALENDAR_ID: optional calendar id. If not set, default calendar is used.

## 3) Deploy web app

1. Click Deploy > New deployment.
2. Type: Web app
3. Execute as: Me
4. Who has access: Anyone
5. Deploy and copy the web app URL.

## 4) Configure frontend env variables

Create a local env file at project root:

NEXT_PUBLIC_BOOKING_API_URL=YOUR_APPS_SCRIPT_WEB_APP_URL
NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL=OPTIONAL_GOOGLE_APPOINTMENT_PAGE_URL

For GitHub Pages, add these variables in your repository settings:
- Settings > Secrets and variables > Actions > Variables

## 5) Add initial availability slots

Use admin mode in your website:
- Open your live URL with ?admin=1 and click Book a Call
- Open Admin slot manager
- Paste ADMIN_TOKEN
- Add start/end slots

## API actions used by frontend

GET
- ?action=slots

POST JSON
- action=book
- action=add_slot
- action=delete_slot
