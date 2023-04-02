// Pure functions

// A pure function is one whose results are dependent only upon the input parameters or independent functions to the project. This Group of functions is like Engine! Which only works on input given.

function TestApp() {

}

function GenerateTableFrom2DArray(data, typeArray) {

  let result = '';
  let counter = 0;
  result += "<table class='table'><tbody>";

  data.forEach(row => {
    counter += 1;
    result += "<tr>";
    row.forEach((value, i) => {
      if (counter === 1) {
        result += (typeArray[i] !== "") ? `<th class='text-primary'>${value}</th>` : "";
      } else {
        switch (typeArray[i]) {
          case "General":
            result += `<td class='text-white align-middle'>${value}</td>`;
            break;

          case "General-Right":
            result += `<td class='text-white align-middle' align='right'>${value}</td>`;
            break;

          case "Currency":
            result += `<td class='text-white align-middle'>${Intl.NumberFormat(FORMAT_CURRENCY_INDIA).format(value.toString())}</td>`;
            break;

          case "Currency-Right":
            result += `<td class='text-white align-middle' align='right'>${Intl.NumberFormat(FORMAT_CURRENCY_INDIA).format(value.toString())}</td>`;
            break;

          case "Date":
            result += `<td class='text-white align-middle'>${new Date(value.toString()).toLocaleDateString()}</td>`;
            break;

          case "":
            result += '';
        }
      }
    });
    result += "</tr>";
  });
  result += "</tbody></table>";

  return result;
}

function IsEmptyTable(tableName) {

  const ss = SpreadsheetApp.openById(DOC_ID);
  const ws = ss.getSheetByName(tableName);

  const data = ws.getRange(1, 1, ws.getLastRow(), ws.getLastColumn()).getValues();

  if (data.length > 1) {
    return false
  } else {
    return true
  }
}

function UpdateRecord(tableName, lookupColumnIndex, recordID, lineItems) {

  const ss = SpreadsheetApp.openById(DOC_ID);
  const ws = ss.getSheetByName(tableName);

  const data = ws.getRange(2, lookupColumnIndex, ws.getLastRow() - 1, 1).getValues().map((row) => row.toString().toLowerCase());
  const index = data.indexOf(recordID);
  let recordItems = [];

  recordItems.push(recordID);
  recordItems.push(new Date());
  recordItems.push(...lineItems);

  if (index !== -1) {
    const targetRow = index + 2;
    ws.getRange(targetRow, 1, 1, ws.getLastColumn()).setValues([recordItems]);
  }
}

function GetRecordDetailsInArrayOnPassingArray(data, lookupItem, lookupColumnIndex) {
  const indexData = data.map(el => el[lookupColumnIndex - 1].toString().toLowerCase());
  const index = indexData.indexOf(lookupItem.toString().toLowerCase());

  if (index !== -1) {
    return data[index];
  }
}

function GetRecordDetailsInArray(tableName, lookupColumnIndex, recordID) {

  const ss = SpreadsheetApp.openById(DOC_ID);
  const ws = ss.getSheetByName(tableName);

  const data = ws.getRange(2, lookupColumnIndex, ws.getLastRow() - 1, ws.getLastColumn()).getValues();
  const indexData = data.map(el => el[lookupColumnIndex - 1].toString().toLowerCase());
  const index = indexData.indexOf(recordID);

  if (index !== -1) {
    return data[index];
  }
}

function DeleteRecordFromTable(tableName, lookupColumnIndex, recordID) {

  const ss = SpreadsheetApp.openById(DOC_ID);
  const ws = ss.getSheetByName(tableName);

  const data = ws.getRange(2, lookupColumnIndex, ws.getLastRow() - 1, 1).getValues().map((row) => row.toString().toLowerCase());
  const index = data.indexOf(recordID);

  if (index !== -1) {
    const targetRow = index + 2;
    ws.deleteRow(targetRow);
  }
}

function CreateTableOfDetails(inputsArray, inputRangeName, outputRangeName, inputsNeeded) {

  const ss = SpreadsheetApp.openById(DOC_ID);
  const inputsToNamedRange = GenerateTwoDimensionalArrayFromSingleDimension(inputsArray);

  if (inputsNeeded) {
    ss.getRangeByName(inputRangeName).setValues(inputsToNamedRange);
  }

  const data = ss.getRangeByName(outputRangeName).getValues();
  let record = "<table class='table table-borderless'><tbody>";

  data.forEach(row => {
    record += "<tr>";
    row.forEach(col => {
      record += `<td class='text-white align-middle'>${col.toString()}</td>`;
    });
    record += "</tr>";
  });

  record += "</tbody></table>";
  return record;

}

function GenerateTwoDimensionalArrayFromSingleDimension(singleDimensionArray) {
  let doubleDimensionalArray = [];
  singleDimensionArray.forEach((el) => {
    doubleDimensionalArray.push([el]);
  });
  return doubleDimensionalArray;
}

function CreateTableOfRecords(tableName, headers, targetCols) {

  const ss = SpreadsheetApp.openById(DOC_ID);
  const ws = ss.getSheetByName(tableName);
  const data = ws.getRange(2, 1, ws.getLastRow() - 1, ws.getLastColumn()).getValues();

  let record = "<table class='table'><thead><tr>";

  headers.push("");

  headers.forEach(header => {
    record += `<th scope='col' class='text-white'>${header}</th>`;
  });

  record += "</tr></thead><tbody>";

  data.forEach(row => {

    record += "<tr>";

    targetCols.forEach(col => {
      record += `<td class='text-white align-middle'>${row[col]}</td>`;
    });

    record += `
        <td class='align-middle'>
          <button class='btn btn-primary m-2' type='submit' id=${row[0]} onClick='EditRecord(this.id)'>Edit</button>
          <button class='btn btn-warning m-2' type='submit' id=${row[0]} onClick='ViewRecord(this.id)'>View</button>
          <button class='btn btn-danger m-2' type='submit' id=${row[0]} onClick='DeleteRecord(this.id)'>Delete</button>
        </td>
      </tr>
    `;
  });

  record += "</tbody></table>";

  return record;
}

function AppendNewRecord(tableName, lineItems, needNewIDAndDateStamp, hasIDAsDateTimeStamp) {

  const ss = SpreadsheetApp.openById(DOC_ID);
  const ws = ss.getSheetByName(tableName);
  let newID = 0;
  const arrayOfItems = [];

  if (needNewIDAndDateStamp) {
    //Insert new ID
    if (hasIDAsDateTimeStamp) {
      newID = DateTimeStampBasedID();
    } else {
      newID = GenerateNewID(tableName);
    }
    arrayOfItems.push(newID);
    //Insert Date Stamp
    arrayOfItems.push(new Date());
  }

  arrayOfItems.push(...lineItems);
  ws.appendRow(arrayOfItems);
  ws.autoResizeColumns(1, ws.getLastColumn());

  if (needNewIDAndDateStamp) {
    return Number(newID);
  }
}

function GetUniqueItemsFromSingleColumnForDropDownOptions(sheetName, columnIndex) {

  const ss = SpreadsheetApp.openById(DOC_ID);
  const ws = ss.getSheetByName(sheetName);
  const data = ws.getRange(1, columnIndex, ws.getRange(1, columnIndex).getDataRegion().getLastRow(), 1).getValues();
  let uniqueList = [];

  if (data.length === 1) {
    return null;
  }

  data.shift();

  data.forEach((cell) => {
    let item = cell[0];
    if (!uniqueList.includes(item)) {
      uniqueList.push(item);
    }
  });

  const options = uniqueList.map((element) => {
    if (element !== '') {
      return "<option>" + element + "</option>";
    }
  });

  return options.join('');
}

function GetDependentUniqueItemsFromSingleColumnForDropDownOptions(sheetName, parentItem, parentColumnIndex, childColumnIndex) {

  const ss = SpreadsheetApp.openById(DOC_ID);
  const ws = ss.getSheetByName(sheetName);
  const parentData = ws.getRange(2, parentColumnIndex, ws.getRange(1, parentColumnIndex).getDataRegion().getLastRow() - 1, 1).getValues();
  const childData = ws.getRange(2, childColumnIndex, ws.getRange(1, childColumnIndex).getDataRegion().getLastRow() - 1, 1).getValues();
  let uniqueList = [];

  if (parentData.length === childData.length) {

    for (let i = 0; i < parentData.length; i++) {
      let parent = parentData[i][0];
      let child = childData[i][0];
      if (parent === parentItem && !uniqueList.includes(child)) {
        uniqueList.push(child);
      }
    }

    const options = uniqueList.map((element) => {
      if (element !== '') {
        return "<option>" + element + "</option>";
      }
    });

    return options.join('')
  } else {
    return '';
  }
}

const DateTimeStampBasedID = () => {
  var date = new Date();
  var year = date.getFullYear();
  var month = String(date.getMonth() + 1).padStart(2, "0");
  var day = String(date.getDate()).padStart(2, "0");
  var seconds = String(date.getSeconds()).padStart(2, "0");
  var minutes = String(date.getMinutes()).padStart(2, "0");
  var hour = String(date.getHours()).padStart(2, "0");
  return year + month + day + "_" + hour + minutes + seconds;
}
