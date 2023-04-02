//-------------------------------------------------------------------------------------------------------------------
// Transactions CRUD Methods
//-------------------------------------------------------------------------------------------------------------------

function AddNewTransaction(lineItems) {
  AppendNewRecord(SHEET_TRANSACTIONS, lineItems, true, true);
}

function UpdateTransaction(lineItems) {
  const recordID = userProperties.getProperty("CurrentID").toString();
  UpdateRecord(SHEET_TRANSACTIONS, 1, recordID, lineItems);
}

function GetTransactionDetailsToUpdate(recordID) {
  let recordList = GetRecordDetailsInArray(SHEET_TRANSACTIONS, 1, recordID);
  return JSON.stringify({
    transactionType: recordList[2],
    student: recordList[3],
    files: recordList[4],
    transactionMethod: recordList[5],
    amount: recordList[6],
    details: recordList[7]
  });
}

function DeleteTransaction(recordID) {
  DeleteRecordFromTable(SHEET_TRANSACTIONS, 1, recordID);
}

function IsEmptyTransactionsTable() {
  return IsEmptyTable(SHEET_TRANSACTIONS);
}

//-------------------------------------------------------------------------------------------------------------------
// Files CRUD Methods
//-------------------------------------------------------------------------------------------------------------------

function AddNewFile(lineItems) {
  AppendNewRecord(SHEET_FILES, lineItems, true, false);
}

function UpdateFile(lineItems) {
  const recordID = userProperties.getProperty("CurrentID").toString();
  UpdateRecord(SHEET_FILES, 1, recordID, lineItems);
}

function GetFileDetailsToUpdate(recordID) {
  let recordList = GetRecordDetailsInArray(SHEET_FILES, 1, recordID);
  return JSON.stringify({
    fullname: recordList[2],
    academicYear: recordList[3],
    courseName: recordList[4],
    instituteName: recordList[5],
    annualFees: recordList[6]
  });
}

function DeleteFile(recordID) {
  DeleteRecordFromTable(SHEET_FILES, 1, recordID);
}

function IsEmptyFilesTable() {
  return IsEmptyTable(SHEET_FILES);
}

function GetFilesForDropDownSelectedStudent(studentName) {
  return GetDependentUniqueItemsFromSingleColumnForDropDownOptions(SHEET_FILES, studentName, 3, 1);
}

//-------------------------------------------------------------------------------------------------------------------
// Students CRUD Methods
//-------------------------------------------------------------------------------------------------------------------

function AddNewStudent(lineItems) {
  let id = AppendNewRecord(SHEET_STUDENTS, lineItems, true, false);
  let userDOB = new Date(lineItems[1].toString());
  let userKey = userDOB.getFullYear();
  const appendActiveUser = [
    id,
    userKey,
    "Student",
    "Active",
    lineItems[0]
  ];
  AppendNewRecord(SHEET_AUTH, appendActiveUser, false, false);
}

function UpdateStudent(lineItems) {
  const recordID = userProperties.getProperty("CurrentID").toString();
  UpdateRecord(SHEET_STUDENTS, 1, recordID, lineItems);
}

function GetStudentDetailsToUpdate(recordID) {
  let recordList = GetRecordDetailsInArray(SHEET_STUDENTS, 1, recordID);
  return JSON.stringify({
    fullname: recordList[2],
    dob: recordList[3],
    presentAddress: recordList[4],
    email: recordList[5],
    phone: recordList[6],
    introducerName: recordList[7],
    introducerPhone: recordList[8]
  });
}

function DeleteStudent(recordID) {
  DeleteRecordFromTable(SHEET_STUDENTS, 1, recordID);
  DeleteRecordFromTable(SHEET_AUTH, 1, recordID);
}

function IsEmptyStudentsTable() {
  return IsEmptyTable(SHEET_STUDENTS);
}
