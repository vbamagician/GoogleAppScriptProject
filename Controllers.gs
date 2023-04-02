const RootDomain = ScriptApp.getService().getUrl();

//----------------------------------------------------------------------------------------------------------------
//Authorization
//----------------------------------------------------------------------------------------------------------------

const AuthenticateUser = (uid, pwd) => {

  const ss = SpreadsheetApp.openById(DOC_ID);

  ss.getRangeByName(NAME_AUTH_INPUT_FIELDS).setValues([[uid], [pwd]]);

  // To refresh the app
  SpreadsheetApp.flush();

  const ResultArray = ss.getRangeByName(NAME_AUTH_RESULT_FIELDS).getValues();

  const IsValid = ResultArray[0][0];
  const UserType = ResultArray[2][0];

  userProperties.setProperty("CurrentUserName", ResultArray[1][0]);
  userProperties.setProperty("CurrentUserType", UserType);
  userProperties.setProperty("CurrentUserStatus", ResultArray[3][0]);

  if (IsValid === "YES") {
    if(UserType === "Admin"){
      return {
        url: RootDomain + "?view=" + VIEW_LANDING_ADMIN,
        valid: true
      }
    } else if (UserType === "Student") {
      return {
        url: RootDomain + "?view=" + VIEW_LANDING_STUDENT,
        valid: true
      }
    }
  } else {
    return {
      valid: false
    }
  }
}

const TakeUserBackToHome = () => {
  if(userProperties.getProperty("CurrentUserType").toString() === "Admin"){
    return {
      url: RootDomain + "?view=" + VIEW_LANDING_ADMIN,
      valid: true
    }
  } else if (userProperties.getProperty("CurrentUserType").toString() === "Student") {
    return {
      url: RootDomain + "?view=" + VIEW_LANDING_STUDENT,
      valid: true
    }
  }
}

const LogoutUser = () => {
  // at this stage, when user wants to logout, we no longer in need of any properties of current user.
  userProperties.deleteAllProperties();
  return {
    url: RootDomain
  }
}

//----------------------------------------------------------------------------------------------------------------
//Form View 
//----------------------------------------------------------------------------------------------------------------

const TakeUserToNewStudentPage = () => {
  userProperties.setProperty("CurrentPageTitle", "Register New Student");
  return {
    url: RootDomain + "?view=" + VIEW_FORM_STUDENT
  }
}

const TakeUserToNewFilePage = () => {
  userProperties.setProperty("CurrentPageTitle", "Register New File");
  return {
    url: RootDomain + "?view=" + VIEW_FORM_FILE
  }
}

const TakeUserToNewTransactionPage = () => {
  userProperties.setProperty("CurrentPageTitle", "Register New Transaction");
  return {
    url: RootDomain + "?view=" + VIEW_FORM_TRANSACTION
  }
}

//----------------------------------------------------------------------------------------------------------------
//Form Update View 
//----------------------------------------------------------------------------------------------------------------

const TakeUserToStudentFormToUpdate = (currentID) => {
  userProperties.setProperty("CurrentPageTitle", "Update Student");
  userProperties.setProperty("CurrentID", currentID);
  return {
    url: RootDomain + "?view=" + VIEW_FORM_STUDENT
  }
}

const TakeUserToFileFormToUpdate = (currentID) => {
  userProperties.setProperty("CurrentPageTitle", "Update File");
  userProperties.setProperty("CurrentID", currentID);
  return {
    url: RootDomain + "?view=" + VIEW_FORM_FILE
  }
}

const TakeUserToTransactionFormToUpdate = (currentID) => {
  userProperties.setProperty("CurrentPageTitle", "Update Transaction");
  userProperties.setProperty("CurrentID", currentID);
  return {
    url: RootDomain + "?view=" + VIEW_FORM_TRANSACTION
  }
}

//----------------------------------------------------------------------------------------------------------------
//Tables View 
//----------------------------------------------------------------------------------------------------------------

const TakeUserToStudentsTablePage = () => {
  if(IsEmptyStudentsTable()){
    return {
      url: "Records Not Found"
    }
  } else {
    userProperties.setProperty("CurrentPageTitle", "Students Table");
    return {
      url: RootDomain + "?view=" + VIEW_TABLE
    }
  }
}

const TakeUserToFilesTablePage = () => {
  if(IsEmptyFilesTable()){
    return {
      url: "Records Not Found"
    }
  } else {
    userProperties.setProperty("CurrentPageTitle", "Files Table");
    return {
      url: RootDomain + "?view=" + VIEW_TABLE
    }
  }
}

const TakeUserToTransactionsTablePage = () => {
  if(IsEmptyTransactionsTable()){
    return {
      url: "Records Not Found"
    }
  } else {
    userProperties.setProperty("CurrentPageTitle", "Transactions Table");
    return {
      url: RootDomain + "?view=" + VIEW_TABLE
    }
  }
}

//----------------------------------------------------------------------------------------------------------------
//Details View 
//----------------------------------------------------------------------------------------------------------------

const TakeUserToStudentDetailsPage = (targetID) => {
  userProperties.setProperty("CurrentPageTitle", "Student Details");
  userProperties.setProperty("TargetID", targetID);
  return {
    url: RootDomain + "?view=" + VIEW_DETAILS
  }
}

const TakeUserToFileDetailsPage = (targetID) => {
  userProperties.setProperty("CurrentPageTitle", "File Details");
  userProperties.setProperty("TargetID", targetID);
  return {
    url: RootDomain + "?view=" + VIEW_DETAILS
  }
}

const TakeUserToTransactionDetailsPage = (targetID) => {
  userProperties.setProperty("CurrentPageTitle", "Transaction Details");
  userProperties.setProperty("TargetID", targetID);
  return {
    url: RootDomain + "?view=" + VIEW_DETAILS
  }
}

const TakeUserToOverallSummaryPage = () => {
  userProperties.setProperty("CurrentPageTitle", "Overall Summary");
  return {
    url: RootDomain + "?view=" + VIEW_DETAILS
  }
}

const TakeUserToStudentSummaryPage = (studentName) => {
  userProperties.setProperty("CurrentPageTitle", "Student Summary");
  userProperties.setProperty("SelectedStudentName", studentName);
  return {
    url: RootDomain + "?view=" + VIEW_DETAILS
  }
}

//----------------------------------------------------------------------------------------------------------------
//Delete View 
//----------------------------------------------------------------------------------------------------------------

const TakeUserToStudentDeletePage = (targetID) => {
  userProperties.setProperty("CurrentPageTitle", "Delete Student");
  userProperties.setProperty("TargetID", targetID);
  return {
    url: RootDomain + "?view=" + VIEW_DETAILS
  }
}

const TakeUserToFileDeletePage = (targetID) => {
  userProperties.setProperty("CurrentPageTitle", "Delete File");
  userProperties.setProperty("TargetID", targetID);
  return {
    url: RootDomain + "?view=" + VIEW_DETAILS
  }
}

const TakeUserToTransactionDeletePage = (targetID) => {
  userProperties.setProperty("CurrentPageTitle", "Delete Transaction");
  userProperties.setProperty("TargetID", targetID);
  return {
    url: RootDomain + "?view=" + VIEW_DETAILS
  }
}

//----------------------------------------------------------------------------------------------------------------
//Back Button Transition Page
//----------------------------------------------------------------------------------------------------------------

const TakeUserToPreviousPage = (previousPage) => {

  switch (previousPage) {

  //Go Back to Student Table page
    case "Student Details":
    case "Delete Student":
    case "Update Student":
      if (IsEmptyStudentsTable()){
        if(userProperties.getProperty("CurrentUserType").toString() === "Admin"){
          return {
            url: RootDomain + "?view=" + VIEW_LANDING_ADMIN,
            valid: true
          }
        } else if (userProperties.getProperty("CurrentUserType").toString() === "Student") {
          return {
            url: RootDomain + "?view=" + VIEW_LANDING_STUDENT,
            valid: true
          }
        }
      } else {
        userProperties.setProperty("CurrentPageTitle", "Students Table");
        return {
          url: RootDomain + "?view=" + VIEW_TABLE
        }
      }
  
  //Go back to File Table Page 
    case "File Details":
    case "Delete File":
    case "Update File":
      if (IsEmptyFilesTable()){
        if(userProperties.getProperty("CurrentUserType").toString() === "Admin"){
          return {
            url: RootDomain + "?view=" + VIEW_LANDING_ADMIN,
            valid: true
          }
        } else if (userProperties.getProperty("CurrentUserType").toString() === "Student") {
          return {
            url: RootDomain + "?view=" + VIEW_LANDING_STUDENT,
            valid: true
          }
        }
      } else {
        userProperties.setProperty("CurrentPageTitle", "Files Table");
        return {
          url: RootDomain + "?view=" + VIEW_TABLE
        }
      }
      
  //Go back to File Table Page 
    case "Transaction Details":
    case "Delete Transaction":
    case "Update Transaction":
      if (IsEmptyTransactionsTable()){
        if(userProperties.getProperty("CurrentUserType").toString() === "Admin"){
          return {
            url: RootDomain + "?view=" + VIEW_LANDING_ADMIN,
            valid: true
          }
        } else if (userProperties.getProperty("CurrentUserType").toString() === "Student") {
          return {
            url: RootDomain + "?view=" + VIEW_LANDING_STUDENT,
            valid: true
          }
        }
      } else {
        userProperties.setProperty("CurrentPageTitle", "Transactions Table");
        return {
          url: RootDomain + "?view=" + VIEW_TABLE
        }
      }
  
  // Got Back to Landing Page From Summary view
    case "Overall Summary":
    case "Student Summary":
      if(userProperties.getProperty("CurrentUserType").toString() === "Admin"){
        return {
          url: RootDomain + "?view=" + VIEW_LANDING_ADMIN,
          valid: true
        }
      } else if (userProperties.getProperty("CurrentUserType").toString() === "Student") {
        return {
          url: RootDomain + "?view=" + VIEW_LANDING_STUDENT,
          valid: true
        }
      }

  }
}
