function GenerateNewID(tableName) {

  const ss = SpreadsheetApp.openById(DOC_ID);
  const ws = ss.getSheetByName(tableName);
  const ids = ws.getRange(1, 1, ws.getLastRow(), 1).getValues();

  if (ids.length === 1) {
    switch (tableName) {
      case SHEET_STUDENTS:
        return START_STUDENT_ID;
      case SHEET_FILES:
        return START_FILE_ID;
    }
  } else {
    const listOfIDs = ids.map((id) => id[0].toString());
    listOfIDs.shift();
    const newID = Math.max(...listOfIDs) + 1;
    return newID;
  }
}
