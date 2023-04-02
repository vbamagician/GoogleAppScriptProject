//User Properties For Storing Globally Accessible Values to Shape App Flow
var userProperties = PropertiesService.getUserProperties();

//Document Credential
const DOC_ID = "1wfvN0mySl5tc7F89Dc1Dw-I5iE2xsu6ps1ID_ar9aZI";

//Sheets Names
const SHEET_AUTH = "auth";
const SHEET_LISTS = "lists";
const SHEET_STUDENTS = "students";
const SHEET_FILES = "files";
const SHEET_TRANSACTIONS = "transactions";
const SHEET_OVERALL = "overall";

// Authorization Engine Constants
const NAME_AUTH_INPUT_FIELDS = "setLoginFields";
const NAME_AUTH_RESULT_FIELDS = "getLoginResult";

const NAME_ENGINE2_INPUT_FIELDS = "setInputsEngine2";
const NAME_ENGINE2_RESULT_FIELDS = "getOutputsEngine2";

const NAME_ENGINE3_INPUT_FIELDS = "setInputsEngine3";
const NAME_ENGINE3_RESULT_FIELDS = "getOutputsEngine3";

const NAME_ENGINE4_INPUT_FIELDS = "setInputsEngine4";
const NAME_ENGINE4_RESULT_FIELDS = "getOutputsEngine4";

// Range of IDs
const START_STUDENT_ID = 1010;
const START_FILE_ID = 10000;

// Views
const VIEW_LOGIN = "view-form-login";
const VIEW_FORM_STUDENT = "view-form-student";
const VIEW_FORM_FILE = "view-form-file";
const VIEW_FORM_TRANSACTION = "view-form-transaction";
const VIEW_TABLE = "view-table";
const VIEW_DETAILS = "view-details";
const VIEW_LANDING_ADMIN = "view-landing-admin";
const VIEW_LANDING_STUDENT = "view-landing-student";

//Format
const FORMAT_CURRENCY_INDIA = "en-IN";
