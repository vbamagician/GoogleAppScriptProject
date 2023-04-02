//-------------------------------------------------------------------------------------------------------------------
// Routing Methods
//-------------------------------------------------------------------------------------------------------------------.

const loadLoginView = () => {
  userProperties.deleteAllProperties();
  return render(VIEW_LOGIN);
}

const loadLogoutView = () => {
  userProperties.deleteAllProperties();
  return render(VIEW_LOGIN);
}

//-------------------------------------------------------------------------------------------------------------------

const loadAdminView = () => {

  const fullName = userProperties.getProperty("CurrentUserName").toString();
  const type = userProperties.getProperty("CurrentUserType").toString();
  const studentsList = GetUniqueItemsFromSingleColumnForDropDownOptions(SHEET_STUDENTS,3);
  
  return render(VIEW_LANDING_ADMIN, {
    currentUserFullName: fullName, 
    currentUserType: type,
    listStudents: studentsList 
  });
}

//-------------------------------------------------------------------------------------------------------------------

const loadStudentView = () => {

  const fullName = userProperties.getProperty("CurrentUserName").toString();
  const type = userProperties.getProperty("CurrentUserType").toString();
  
  return render(VIEW_LANDING_STUDENT, {
    currentUserFullName: fullName, 
    currentUserType: type
  });
}

//-------------------------------------------------------------------------------------------------------------------

const loadNewStudentView = () => {

  const pageTitle = userProperties.getProperty("CurrentPageTitle").toString();

  return render(VIEW_FORM_STUDENT, {
    currentPageTitle: pageTitle
  });
}

//-------------------------------------------------------------------------------------------------------------------

const loadNewFileView = () => {

  const pageTitle = userProperties.getProperty("CurrentPageTitle").toString();
  const academicYearsList = GetUniqueItemsFromSingleColumnForDropDownOptions(SHEET_LISTS,1);
  const studentsList = GetUniqueItemsFromSingleColumnForDropDownOptions(SHEET_STUDENTS,3);
  
  return render(VIEW_FORM_FILE, {
    currentPageTitle: pageTitle,
    listAcademicYears: academicYearsList, 
    listStudents: studentsList
  });
}

//-------------------------------------------------------------------------------------------------------------------

const loadNewTransactionView = () => {

  const pageTitle = userProperties.getProperty("CurrentPageTitle").toString();
  const transactionTypeList = GetUniqueItemsFromSingleColumnForDropDownOptions(SHEET_LISTS, 3);
  const transactionMethodList = GetUniqueItemsFromSingleColumnForDropDownOptions(SHEET_LISTS,5);
  const studentsList = GetUniqueItemsFromSingleColumnForDropDownOptions(SHEET_STUDENTS,3);

  return render(VIEW_FORM_TRANSACTION, {
    currentPageTitle: pageTitle,
    listTransactionType: transactionTypeList,
    listTransactionMethod: transactionMethodList,
    listStudents: studentsList
  });
}

//-------------------------------------------------------------------------------------------------------------------

const loadTableView = () => {

  let headers;
  let targetCols;

  const pageTitle = userProperties.getProperty("CurrentPageTitle").toString();

  switch (pageTitle){

  // Students Table 
    case "Students Table": 

      headers = ['Student ID', 'Student Name', 'Student Phone'];
      targetCols = [0, 2, 6];
      const studentsTableData = CreateTableOfRecords(SHEET_STUDENTS, headers, targetCols);
      
      return render(VIEW_TABLE, {
        targetEntityTableName: "Students Table",
        targetEntityTableData: studentsTableData
      });
  
  // Files Table 
    case "Files Table":

      headers = ['File ID','Student Name','Academic Year'];
      targetCols = [0, 2, 3];
      const filesTableData = CreateTableOfRecords(SHEET_FILES, headers, targetCols);
      
      return render(VIEW_TABLE, {
        targetEntityTableName: "Files Table",
        targetEntityTableData: filesTableData
      });

  // Transaction Table
    case "Transactions Table":

      headers = ['Transaction ID', 'Transaction Type', 'Student Name', 'File', 'Amount'];
      targetCols = [0, 2, 3, 4, 6];
      const transactionsTableData = CreateTableOfRecords(SHEET_TRANSACTIONS, headers, targetCols);

      return render(VIEW_TABLE, {
        targetEntityTableName: "Transactions Table",
        targetEntityTableData: transactionsTableData
      });

  }
}

//-------------------------------------------------------------------------------------------------------------------

const loadDetailsView = () => {

  const pageTitle = userProperties.getProperty("CurrentPageTitle").toString();
  let targetID = 0;

  switch (pageTitle){

  // Student Details
    case "Student Details": 
    case "Delete Student":

      targetID  = userProperties.getProperty("TargetID").toString();
      const studentDetails = CreateTableOfDetails([targetID],NAME_ENGINE2_INPUT_FIELDS,NAME_ENGINE2_RESULT_FIELDS,true);

      return render(VIEW_DETAILS, {
        detailsPageName: pageTitle,
        detailsFromServer: studentDetails
      });
  
  // File Details 
    case "File Details": 
    case "Delete File":

      targetID  = userProperties.getProperty("TargetID").toString();
      const fileDetails = CreateTableOfDetails([targetID],NAME_ENGINE3_INPUT_FIELDS,NAME_ENGINE3_RESULT_FIELDS,true);

      return render(VIEW_DETAILS, {
        detailsPageName: pageTitle,
        detailsFromServer: fileDetails
      });
     
  // Transaction Details
    case "Transaction Details": 
    case "Delete Transaction":

      targetID  = userProperties.getProperty("TargetID").toString();
      const transactionDetails = CreateTableOfDetails([targetID],NAME_ENGINE4_INPUT_FIELDS,NAME_ENGINE4_RESULT_FIELDS,true);
      
      return render(VIEW_DETAILS, {
        detailsPageName: pageTitle,
        detailsFromServer: transactionDetails
      });

  // Overall Summary
    case "Overall Summary":

      const overallsummaryDetails = GenerateOverallSummary();

      return render(VIEW_DETAILS, {
        detailsPageName: pageTitle,
        detailsFromServer: overallsummaryDetails
      });

  // Student Summary
    case "Student Summary":

      const selectedStudentName = userProperties.getProperty("SelectedStudentName").toString();
      const studentSummaryDetails = GenerateStudentSummary(selectedStudentName);
      
      return render(VIEW_DETAILS, {
        detailsPageName: pageTitle,
        detailsFromServer: studentSummaryDetails
      });
  }
}

//-------------------------------------------------------------------------------------------------------------------

// Render Method
const render = (view, argsObject) => {

  let htmlContent = HtmlService.createTemplateFromFile(view);

  if (argsObject) {
    let keys = Object.keys(argsObject);
    keys.forEach((key) => {
      htmlContent[key] = argsObject[key];
    });
  }

  return htmlContent.evaluate()
  // return htmlContent.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

//-------------------------------------------------------------------------------------------------------------------

//Including HTML Files with Rendered HTML Pages
const include = (fileName) => {
  return HtmlService.createHtmlOutputFromFile(fileName).getContent();
}
