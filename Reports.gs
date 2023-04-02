const IsOkayToProduceStudentSummary = (studentName) => {

  const ss = SpreadsheetApp.openById(DOC_ID);

  const studentsSheet = ss.getSheetByName(SHEET_STUDENTS);
  const filesSheet = ss.getSheetByName(SHEET_FILES);
  const transactionsSheet = ss.getSheetByName(SHEET_TRANSACTIONS);

  // Get all the data from the table 
  const studentsData = studentsSheet.getRange(1, 1, studentsSheet.getLastRow(), studentsSheet.getLastColumn()).getValues();
  const filesData = filesSheet.getRange(1, 1, filesSheet.getLastRow(), filesSheet.getLastColumn()).getValues();
  const transactionsData = transactionsSheet.getRange(1, 1, transactionsSheet.getLastRow(), transactionsSheet.getLastColumn()).getValues();

  if (studentsData.length === 1) {
    return {
      decision: false
    };
  }

  if (filesData.length === 1) {
    return {
      decision: false
    };
  }

  if (transactionsData.length === 1) {
    return {
      decision: false
    };
  }

  return {
    decision: true
  };
}

const GenerateStudentSummary = (studentName) => {

  const ss = SpreadsheetApp.openById(DOC_ID);

  const studentsSheet = ss.getSheetByName(SHEET_STUDENTS);
  const filesSheet = ss.getSheetByName(SHEET_FILES);
  const transactionsSheet = ss.getSheetByName(SHEET_TRANSACTIONS);

  // Get all the data from the table 
  const studentsData = studentsSheet.getRange(2, 1, studentsSheet.getLastRow() - 1, studentsSheet.getLastColumn()).getValues();
  const filesData = filesSheet.getRange(2, 1, filesSheet.getLastRow() - 1, filesSheet.getLastColumn()).getValues();
  const transactionsData = transactionsSheet.getRange(2, 1, transactionsSheet.getLastRow() - 1, transactionsSheet.getLastColumn()).getValues();

  // Set Headers for Reports Table
  const filesHeaders = ["File ID","Last Edited On","Student Name","Academic Year","Course Name","Institute Name","Annual Fees"];
  const transactionsHeaders = ["Transaction ID","Last Edited On","Transaction Type","Student Name","Student File","Transaction Method","Transaction Amount","Transaction Details"];

  // Get Target Student Row from the Student Table to Get some of his informations
  const studentRecordItems = GetRecordDetailsInArrayOnPassingArray(studentsData, studentName, 3);

  let studentLoanAmount = 0;
  let studentReturnAmount = 0;
  let studentOutstandingAmount = 0;

  // Filter Files and Transactions data based on target student 

  const filteredFilesData = filesData.filter(row => {
    return row[2] === studentName;
  });

  const filteredTransactionsData = transactionsData.filter(row => {
    if (row[3].toString().toLowerCase() === studentName.toString().toLowerCase()) {
      studentLoanAmount += (row[2] === 'Paid') ? row[6] : 0;
      studentReturnAmount += (row[2] === 'Received') ? row[6] : 0;
    }
    return row[3] === studentName;
  });

  // Add headers to the filtered data 
  filteredFilesData.unshift(filesHeaders);
  filteredTransactionsData.unshift(transactionsHeaders);

  // Calculating Outstanding amount of student 
  studentOutstandingAmount = studentLoanAmount - studentReturnAmount;

  let result = '';

  // Student's Introduction Details
  result += GenerateTableFrom2DArray([
    ["Description","Values"],
    ["Student ID", studentRecordItems[0]],
    ["Student Name", studentRecordItems[2]],
    ["Student Phone", studentRecordItems[6]]
  ], ["General", "General"]);

  // Student's Outstanding Details
  result += GenerateTableFrom2DArray([
    ["Description","Values"],
    ["Total Loan Amount", studentLoanAmount],
    ["Total Repaid Amount", studentReturnAmount],
    ["Total Outstanding Amount", studentOutstandingAmount]
  ], ["General", "Currency"]);

  result += "<h4 class='mt-4 mb-4 text-warning'>File(s) registered with student</h4>";

  result += GenerateTableFrom2DArray(filteredFilesData, ["General", "Date", "General", "General", "General", "General", "Currency"]);

  result += "<h4 class='mt-4 mb-4 text-warning'>Transactions(s) registered with student</h4>";

  result += GenerateTableFrom2DArray(filteredTransactionsData, ["General", "", "General", "General", "General", "General", "Currency", "General"]);

  return result;
}

const GenerateOverallSummary = () => {

  const ss = SpreadsheetApp.openById(DOC_ID);
  const ws = ss.getSheetByName(SHEET_OVERALL);
  const data = ws.getRange("A1:B5").getValues();
  data.unshift(["Description","Values"]);
  const record = GenerateTableFrom2DArray(data, ["General","Currency"]);
  
  return record;
}
