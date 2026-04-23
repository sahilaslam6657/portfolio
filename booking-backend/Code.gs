const SHEET_NAME = "availability";

function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || "slots";

  if (action === "slots") {
    return json({ slots: listOpenSlots_() });
  }

  return json({ ok: false, message: "Unsupported GET action." });
}

function doPost(e) {
  const payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");
  const action = payload.action;

  if (action === "book") {
    return json(bookSlot_(payload));
  }

  if (action === "add_slot") {
    return json(addSlot_(payload));
  }

  if (action === "delete_slot") {
    return json(deleteSlot_(payload));
  }

  return json({ ok: false, message: "Unsupported POST action." });
}

function listOpenSlots_() {
  const sheet = getOrCreateSheet_();
  const values = sheet.getDataRange().getValues();

  if (values.length <= 1) return [];

  const now = new Date();
  return values
    .slice(1)
    .map(function (row) {
      return {
        id: row[0],
        start: row[1],
        end: row[2],
        status: row[7] || "open",
      };
    })
    .filter(function (slot) {
      return slot.status === "open" && new Date(slot.start) > now;
    });
}

function addSlot_(payload) {
  if (!isAuthorized_(payload.token)) {
    return { ok: false, message: "Unauthorized admin token." };
  }

  if (!payload.start || !payload.end) {
    return { ok: false, message: "Both start and end times are required." };
  }

  const sheet = getOrCreateSheet_();
  const id = Utilities.getUuid();
  sheet.appendRow([id, payload.start, payload.end, "", "", "", "", "open", ""]);

  return { ok: true, message: "Slot added.", slotId: id };
}

function deleteSlot_(payload) {
  if (!isAuthorized_(payload.token)) {
    return { ok: false, message: "Unauthorized admin token." };
  }

  const slotId = payload.slotId;
  if (!slotId) {
    return { ok: false, message: "slotId is required." };
  }

  const sheet = getOrCreateSheet_();
  const values = sheet.getDataRange().getValues();
  let rowIndex = -1;

  for (var i = 1; i < values.length; i += 1) {
    if (values[i][0] === slotId) {
      rowIndex = i + 1;
      break;
    }
  }

  if (rowIndex === -1) {
    return { ok: false, message: "Slot not found." };
  }

  const eventId = sheet.getRange(rowIndex, 9).getValue();
  if (eventId) {
    const calendar = CalendarApp.getCalendarById(getCalendarId_());
    const event = calendar && calendar.getEventById(eventId);
    if (event) event.deleteEvent();
  }

  sheet.deleteRow(rowIndex);
  return { ok: true, message: "Slot deleted." };
}

function bookSlot_(payload) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);

  try {
    const slotId = payload.slotId;
    if (!slotId || !payload.name || !payload.email) {
      return { ok: false, message: "slotId, name, and email are required." };
    }

    const sheet = getOrCreateSheet_();
    const values = sheet.getDataRange().getValues();
    let rowIndex = -1;
    let slot;

    for (var i = 1; i < values.length; i += 1) {
      if (values[i][0] === slotId) {
        rowIndex = i + 1;
        slot = values[i];
        break;
      }
    }

    if (!slot) {
      return { ok: false, message: "Selected slot no longer exists." };
    }

    const status = slot[7] || "open";
    if (status !== "open") {
      return { ok: false, message: "This slot was already booked. Please pick another one." };
    }

    const start = new Date(slot[1]);
    const end = new Date(slot[2]);

    const calendar = CalendarApp.getCalendarById(getCalendarId_());
    const title = "Business Growth Consultation";
    const description = [
      "Booked from portfolio scheduler",
      "Name: " + payload.name,
      "Email: " + payload.email,
      "Company: " + (payload.company || "-"),
      "Notes: " + (payload.notes || "-"),
    ].join("\n");

    const event = calendar.createEvent(title, start, end, {
      description: description,
      guests: payload.email,
      sendInvites: true,
    });

    sheet.getRange(rowIndex, 4).setValue(payload.name);
    sheet.getRange(rowIndex, 5).setValue(payload.email);
    sheet.getRange(rowIndex, 6).setValue(payload.company || "");
    sheet.getRange(rowIndex, 7).setValue(payload.notes || "");
    sheet.getRange(rowIndex, 8).setValue("booked");
    sheet.getRange(rowIndex, 9).setValue(event.getId());

    return { ok: true, message: "Consultation confirmed and calendar invite sent." };
  } finally {
    lock.releaseLock();
  }
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "id",
      "start",
      "end",
      "name",
      "email",
      "company",
      "notes",
      "status",
      "eventId",
    ]);
  }

  return sheet;
}

function getCalendarId_() {
  return PropertiesService.getScriptProperties().getProperty("CALENDAR_ID") || CalendarApp.getDefaultCalendar().getId();
}

function isAuthorized_(token) {
  const expected = PropertiesService.getScriptProperties().getProperty("ADMIN_TOKEN");
  return expected && token && expected === token;
}

function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
