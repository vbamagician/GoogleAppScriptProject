// © 2022-23 Kamal Bharakhda,  kamal.9328093207@gmail.com,  +91-9328093207

// Routing Mechanism
let Route = {};
Route.path = (route, callback) => {
  Route[route] = callback;
}

// Entry Level Procedure
function doGet(e) {

  Route.path(VIEW_LOGIN, loadLoginView);
  Route.path(VIEW_LOGIN, loadLogoutView);
  Route.path(VIEW_LANDING_ADMIN, loadAdminView);
  Route.path(VIEW_LANDING_STUDENT, loadStudentView);

  Route.path(VIEW_FORM_STUDENT, loadNewStudentView);
  Route.path(VIEW_FORM_FILE, loadNewFileView);
  Route.path(VIEW_FORM_TRANSACTION, loadNewTransactionView);
  
  Route.path(VIEW_TABLE, loadTableView);
  Route.path(VIEW_DETAILS, loadDetailsView);

  if (Route[e.parameters.view]) {
    return Route[e.parameters.view]();
  } else {
    return loadLoginView();
  }
}
