function doGet() {
  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0");
}

//Sending data to sheets
const addData = (formData) => {
  try {
    const { transactionType } = formData;
    const { data, sheet } = checkSheetData(transactionType);

    const keyRow = sheet.getLastRow() + 1;
    const headers = data[0];
    formData.transactionId = generateTransactionId(
      transactionType.slice(0, 3).toUpperCase()
    );
    const addedData = {};
    if (formData.memberId) {
      addedData.memberName = members.get(formData.memberId) || "Unknown";
      if (!addedData.memberName) {
        throw new Error(`Member with ID '${formData.memberId}' not found`);
      }
    }
    addedData.transactionType = transactionType;
    formData.transactionDate = convertToDate(formData.transactionDate);

    Object.entries(formData).forEach(([key, value]) => {
      const keyColumn = headers.indexOf(key) + 1;
      if (keyColumn) {
        const dataCell = sheet.getRange(keyRow, keyColumn);
        dataCell.setValue(value);
        addedData[key] = value;
      }
    });

    // ⏪ Recurse interest repayment if it's a loanRepay transaction
    if (transactionType === "loanRepay" && formData.pendingInterest) {
      const interestForm = {
        ...formData,
        transactionType: "interest",
        amount: formData.pendingInterest,
      };
      const interestMsg = addData(interestForm);
      if (interestMsg.status === "success") {
        addedData.interest = interestForm.amount;
        addedData.interestTransId = interestMsg.data.transactionId;
      }
    }

    const succesMsg = {
      status: "success",
      action: "add",
      message: "Data added successfully",
      data: addedData,
    };
    return JSON.parse(JSON.stringify(succesMsg));
  } catch (error) {
    const errorMsg = {
      status: "error",
      message: error.message,
    };
    return errorMsg;
  }
};

//Editing Sheet data
const editData = (formData) => {
  try {
    const { transactionType, transactionId } = formData;
    const { data, sheet } = checkSheetData(transactionType);
    const headers = data[0];
    let updated = false;
    const edittedData = {};
    formData.transactionDate = convertToDate(formData.transactionDate);
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === transactionId) {
        const keyRow = i + 1;
        Object.entries(formData).forEach(([key, value]) => {
          const keyColumn = headers.indexOf(key) + 1;
          if (keyColumn) {
            const dataCell = sheet.getRange(keyRow, keyColumn);
            dataCell.setValue(value);
            edittedData[key] = value;
          }
        });
        edittedData.memberName = members.get(formData.memberId) || "Unknown";
        edittedData.transactionType = transactionType;
        updated = true;
        break;
      }
    }
    if (!updated) {
      throw new Error(`Transaction ID '${transactionId}' not found`);
    }
    const succesMsg = {
      status: "success",
      action: "edit",
      message: "Data updated successfully",
      data: edittedData,
    };
    return JSON.parse(JSON.stringify(succesMsg));
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

//Deleting data from the sheets
const deleteData = (formData) => {
  try {
    const { transactionType, transactionId, memberId } = formData;
    const { data, sheet } = checkSheetData(transactionType);
    let deleted = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === transactionId) {
        sheet.deleteRow(i + 1);
        deleted = true;
        break;
      }
    }
    if (!deleted) {
      throw new Error(`Transaction ID '${transactionId}' not found`);
    }
    const deletedData = {
      transactionId,
      memberId,
      memberName: members.get(formData.memberId) || "Unknown",
    };
    return {
      status: "success",
      action: "delete",
      message: "Transaction deleted successfully",
      data: deletedData,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
//Fetching Data from sheets
const fetchData = (formData) => {
  try {
    const { dataType, memberId, transactionType, limit } = formData;
    let dataObject;
    const members = getAllMemberNames();

    if (dataType === "transactions") {
      dataObject = getTransactionsData(
        transactionType,
        memberId,
        limit,
        members
      );
    } else if (dataType === "recentTransactions") {
      dataObject = getRecentTransactionsData(memberId, limit, members);
    } else {
      dataObject = getGeneralData();
    }

    return dataObject;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

//GET All transactions data
const getRecentTransactionsData = (memberId, limit, members) => {
  try {
    const recentTransactions = [];
    const transactionTypes = [
      "loans",
      "shares",
      "savings",
      "penalties",
      "interest",
      "loanRepay",
      "expenditures",
    ];

    for (const transactionType of transactionTypes) {
      const transactions = getTransactionsData(
        transactionType,
        memberId,
        5,
        members
      );
      if (transactions.status === "success" && transactions.data) {
        transactions.data.forEach((transaction) => {
          transaction.transactionType = transactionType;
        });
        recentTransactions.push(...transactions.data);
      }
    }

    recentTransactions.sort(
      (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
    );

    const filteredTransactions = recentTransactions.slice(0, limit);

    if (filteredTransactions.length === 0) {
      throw new Error("No recent transactions found");
    }

    return {
      status: "success",
      action: "fetch",
      message: "Recent transactions retrieved successfully",
      data: filteredTransactions,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

// Retrieve transaction Data
const getTransactionsData = (transactionType, memberId, limit, members) => {
  try {
    const { data } = checkSheetData(transactionType);
    const headers = data.shift();
    let dataObj;
    if (memberId) {
      dataObj = data.filter((row) => row[1] === memberId);
    } else {
      dataObj = data;
    }
    const dateSorted = dataObj.sort((a, b) => {
      return new Date(b[3]) - new Date(a[3]);
    });
    const structuredData = dateSorted.map((row) => {
      const transaction = {};
      transaction.transactionType = transactionType;
      headers.forEach((header, index) => {
        transaction[header] = row[index];
      });
      transaction.memberName = members.get(transaction.memberId) || "Unknown";
      return transaction;
    });
    const requiredData = structuredData.slice(0, limit || 10);
    if (requiredData.length == 0) {
      throw new Error(`No records found`);
    }

    const succesObj = {
      status: "success",
      action: "fetch",
      message: "Data retrieved successfully",
      data: requiredData,
    };
    return JSON.parse(JSON.stringify(succesObj));
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
const getGeneralData = () => {
  try {
    const { data: metricsData } = checkSheetData("metrics");
    const { data: accountsData } = checkSheetData("accounts");

    const [metricKeys, metricValues] = metricsData;
    const metricObj = {};
    metricKeys.forEach((key, index) => {
      metricObj[key] = metricValues[index];
    });

    return {
      status: "success",
      action: "fetch",
      message: "General data fetched successfully",
      data: {
        accountsData,
        metricObj,
      },
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

//Helper function to check sheet and return data
const checkSheetData = (transactionType) => {
  try {
    const sheetName = transactionType;
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (!sheet) {
      throw new Error(`Transaction '${sheetName}' not found`);
    }
    const data = sheet.getDataRange().getValues();
    return { data, sheet };
  } catch (error) {
    return error;
  }
};

//Get names map
const getAllMemberNames = () => {
  const sheetName = "Database";
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  const data = sheet.getDataRange().getValues();
  const memberMap = new Map();

  for (let i = 0; i < data.length; i++) {
    const memberId = data[i][0];
    const memberName = data[i][2];
    memberMap.set(memberId, memberName);
  }

  return memberMap;
};

//Helper function to generate transaction IDs
const generateTransactionId = (prefix) => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const randomPart = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `${prefix}${year}${month}${day}-${randomPart}`;
};

//Convert string dates to date objects
const convertToDate = (input) => {
  if (input instanceof Date) return input; // Already valid
  if (typeof input !== "string") return null;

  const parts = input.split("/");
  if (parts.length !== 3) return null;

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  const date = new Date(year, month, day);
  return isNaN(date.getTime()) ? null : date;
};

const requestHandlers = {
  addData: addData,
  editData: editData,
  deleteData: deleteData,
  fetchData: fetchData,
};

const checkRequest = (formData, requestType) => {
  const handler = requestHandlers[requestType];
  return handler ? handler(formData) : addData(formData);
};
