const generateMonthlyReport = () => {
  const storageFolderId = "1W4G3CLp4U9cOqm_U6W7jlLJ9xP2GeH_t";
  const folder = DriveApp.getFolderById(storageFolderId);
  const { pdfContent, month, year } = monthPdfReport();
  const pdfBlob = Utilities.newBlob(
    pdfContent,
    "text/html",
    "New " + month + "-" + year + " report"
  ).getAs("application/pdf");
  folder.createFile(pdfBlob);
};

const monthPdfReport = () => {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const monthShort = date.toLocaleString("default", { month: "short" });
  const membersIdMap = getAllMemberNames();

  const monthSummarySheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Monthly metrics");
  const monthSummaryData = monthSummarySheet.getDataRange().getDisplayValues();
  const summaryHeaders = monthSummaryData[0];
  const summaryValues = monthSummaryData[1];
  const keyValuePairs = summaryHeaders.map((key, index) => [
    key,
    summaryValues[index],
  ]);

  const monthlySummaryTable = createTableHtml(keyValuePairs);

  //COVERTING MONTHLY DATA TO EASILY READ VALUES
  const summaryData = summaryHeaders.reduce((acc, key, i) => {
    acc[key] = summaryValues[i];
    return acc;
  }, {});

  const accountsSheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("accounts");
  const accountsData = accountsSheet.getDataRange().getDisplayValues();
  const accountsDataTable = createTableHtml(accountsData);

  const loansSheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("loans");
  const loansData = loansSheet.getDataRange().getDisplayValues();

  const activeLoans = filterbyStatus(loansData, "active");
  const activeLoansSummary = loansSummary(activeLoans);
  const activeLoansSummaryTable = createTableHtml(activeLoansSummary);

  const overdueLoans = filterbyStatus(loansData, "overdue");
  const overdueLoansSummary = loansSummary(overdueLoans);
  const overdueLoansSummaryTable = createTableHtml(overdueLoansSummary);

  const monthlyLoansData = filterByCurrentMonth(loansData);
  const monthLyLoansSummary = loansSummary(monthlyLoansData);
  const monthLyLoansSummaryTable = createTableHtml(monthLyLoansSummary);

  const savingsSheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("savings");
  const savingsData = savingsSheet.getDataRange().getDisplayValues();

  const monthlySavingsData = filterByCurrentMonth(savingsData);
  const monthLySavingsTable = createTableHtml(monthlySavingsData);

  const { topSaverId, topAmount } = getTopSaver(monthlySavingsData);
  const topSaverName = membersIdMap.get(topSaverId);

  const withdrawalSheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("withdraw");
  const withdrawData = withdrawalSheet.getDataRange().getDisplayValues();

  const monthlywithdrawData = filterByCurrentMonth(withdrawData);
  const monthLywithdrawTable = createTableHtml(monthlywithdrawData);

  const expensesSheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("expenditures");
  const expensesData = expensesSheet.getDataRange().getDisplayValues();

  const monthlyExpensesData = filterByCurrentMonth(expensesData);
  const monthlyExpensesTable = createTableHtml(monthlyExpensesData);

  let pdfContent =
    "<h1 style='text-align: center; font-family: Times New Roman; text-transform: uppercase;'>KIU ALUMNI DOCTORS IN HEALTH COPERATIVE SOCIETY</h1>";
  pdfContent +=
    "<p style='text-align: center; color: green; font-family: Times New Roman;'>\"Development in Health\"</p>";
  pdfContent += "<hr style='border-top: 3px solid red;'>";
  pdfContent +=
    "<p style=' text-align: right; font-family: Times New Roman;'><strong>DATE:</strong> " +
    formatDate(date) +
    "</p>";
  pdfContent +=
    "<h2 style ='text-align: center; font-family: Times New Roman; text-transform: uppercase;'>DIH MONTHLY REPORT " +
    "(" +
    month +
    ")" +
    "</h2>";
  pdfContent +=
    "<p style ='text-align: left; font-family: Times New Roman;'><strong>Period: </strong>" +
    monthShort +
    " 1st -" +
    monthShort +
    " 30th </p>";
  pdfContent +=
    "<h2 style='text-align: center; font-family: Times New Roman; text-transform: uppercase;'>EXECUTIVE SUMMARY</h2>";
  pdfContent += monthlySummaryTable;
  pdfContent +=
    "<h2 style='font-family: Times New Roman; text-transform: uppercase;'> 1. INTRODUCTION</h2>";
  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>The KIU Alumni Cooperative Society Monthly Report provides a comprehensive overview of the financial activities of the society and member engagement for " +
    month +
    " - " +
    year +
    ". This report highlights key performance indicators, loan disbursements, savings mobilization among others showing our commitment to supporting the financial well-being of the society members. </p>";
  pdfContent +=
    "<h2 style='font-family: Times New Roman; text-transform: uppercase;'> 2. MEMBERS ACCOUNTS OVERVIEW</h2>";
  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>This is an overview of individual member accounts as of end of " +
    month +
    ". It includes the total number of shares held and the current account balances for each member.</p>";
  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>The table below is a summary of all active members equity and liquidity status within the SACCO. These figures help highlight individual contributions and financial positions, which support overall transparency and accountability in our financial operations.</p>";
  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>All balances are reflected in Ugandan Shillings (UGX) and based on system records as of the last day of the month.</p>";
  pdfContent += accountsDataTable;
  pdfContent +=
    "<h2 style='font-family: Times New Roman; text-transform: uppercase;'>3. LOANS ISSUED IN " +
    month +
    "</h2>";
  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>A total of " +
    summaryData["No. of Loans issued"] +
    " loan(s) were issued in " +
    month +
    " making a total of UGX " +
    summaryData["Loans sum issued"] +
    ". The society earned a total of UGX " +
    summaryData["Total Interest recieved"] +
    " from interest on loans issued before the begining of this month. In accordance to our loans policy, the society charges a 5% and a 3% monthly interest on instant loans and short-term loans respectively. Below is a table showing a summary for loans issued in this month.</p>";

  pdfContent += monthLyLoansSummaryTable;
  pdfContent +=
    "<h3 style=' font-family: Times New Roman; text-transform: uppercase;'>3.1. CURRENT ACTIVE LOANS</h3>";
  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>These are all loans that remain <strong>active</strong> as of the end of " +
    month +
    "-" +
    year +
    ". There are currently " +
    summaryData["No. of active loans"] +
    " active loan(s) including " +
    summaryData["No. of overdue loans"] +
    " loan(s) that are overdue. These are loans that have been disbursed to members but are yet to be fully settled. Tracking active loans is essential to assess the SACCO's current credit exposure, outstanding balances, and member obligations.</p>";
  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>The table below outlines all current active loans, enabling the SACCO leadership to monitor performance, identify risks, and make informed financial decisions.</p>";

  pdfContent += activeLoansSummaryTable;
  pdfContent +=
    "<h3 style='font-family: Times New Roman; text-transform: uppercase;'>3.2. OVERDUE LOANS</h3>";
  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>Overdue loans represent amounts that have not been repaid within the agreed loan duration, indicating delays in loan servicing obligations by members. Some of these members may have made communication with the loans committee and were given a grace period. According to our by-laws, instant loans mature in not more than one month while short-term loans mature in a period agreed apon on application and must be between 3-5 months. Timely identification of these loans is critical for initiating recovery measures and maintaining healthy cash flow within the SACCO.</p>";
  pdfContent += overdueLoansSummaryTable;
  pdfContent +=
    "<h2 style='font-family: Times New Roman; text-transform: uppercase;'>4. SAVINGS AND WITHDRAWALS</h2>";
  pdfContent +=
    "<h3 style='font-family: Times New Roman; text-transform: uppercase;'>4.1. SAVINGS</h3>";
  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>These are savings collected during " +
    month +
    " " +
    year +
    ", and reflect the financial commitment and participation of members in building their personal capital and supporting the SACCO liquidity. This section outlines the individual savings transactions recorded within this month.</p>";
  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>The total savings collected were UGX " +
    summaryData["Total savings"] +
    ". The top saver in this month is Mr/Mrs. " +
    topSaverName +
    ", " +
    "Member ID: " +
    topSaverId +
    ", with an amount of UGX " +
    topAmount +
    ". Below is a table showing a summary of savings collected in " +
    month +
    ".</p>";
  pdfContent += monthLySavingsTable;
  pdfContent +=
    "<h3 style='font-family: Times New Roman; text-transform: uppercase;'>4.2. WITHDRAWALS</h3>";
  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>These are the withdrawals made in this month. The total amount withdrawn is UGX " +
    summaryData["Withdrawals"] +
    ". Members access to their funds is very crucial in any financial setting like DIH. The table below summarizes all withdrawals processed within the month.</p>";
  pdfContent += monthLywithdrawTable;
  pdfContent +=
    "<h2 style='font-family: Times New Roman; text-transform: uppercase;'>5. GROUP EXPENDITURES</h2>";
  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>The financial sustainability of the SACCO depends not only on income generation but also on good expenditure management. During the month of " +
    month +
    ", various disbursements were made to support the operations and commitments of the SACCO.</p>";

  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>These expenditures covered administrative costs, mobilization activities, and other essential activities that ensure the SACCO runs efficiently. Transparent documentation reporting of these costs ensures accountability and ensures members stay informed about how funds are utilized. A total of UGX " +
    summaryData["Total expenses this month"] +
    " was spent this month</p>";

  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>The table below outlines all financial outflows recorded in this month.</p>";
  pdfContent += monthlyExpensesTable;
  pdfContent +=
    "<h2 style='font-family: Times New Roman; text-transform: uppercase;'>6. CUMULATIVE FINANCIAL SUMMARY</h2>";
  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>To conclude, the cumulative financial metrics of the SACCO from its inception to the end of " +
    month +
    " reflects total metric financial figures leading to the current bank balance.</p>";

  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>Since its inception, the society has acccumulated a total of UGX " +
    summaryData["Membership fee"] +
    " From member registration fees, UGX " +
    summaryData["Cummulative savings"] +
    " from member savings, UGX " +
    summaryData["Total share capital"] +
    " as share capital and UGX " +
    summaryData["Cumulative interest"] +
    " from interest earnings.</p>";

  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'> In addition the SACCO has incurred a total of UGX " +
    summaryData["Cummulative expenses"] +
    " in expenses, disbursed UGX " +
    summaryData["Total withdraws"] +
    " as withdraws.The closing balance in the SACCO bank account as at the end of " +
    month +
    " stands at <strong>UGX " +
    summaryData["Bank Balance"] +
    "</strong>, representing the available liquidity for the operations and upcoming loan disbursements.</p>";

  pdfContent +=
    "<p style='text-align: center; font-family: Times New Roman; text-transform: uppercase;'><strong>END</strong></p>";
  pdfContent +=
    "<p style='font-family: Times New Roman; text-transform: uppercase;'><strong>Regards: </strong>DIH Automation system.</p>";

  return { pdfContent, month, year };
};

const formatDate = (date) => {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  return day + "-" + month + "-" + year;
};

const createTableHtml = (data) => {
  let tableHtml = "<table style='width: 100%; font-family: Times New Roman;'>";

  data.forEach((row) => {
    tableHtml += "<tr>";
    row.forEach(function (cell, index) {
      let cellStyle = "padding: 5px; border: 1px solid black;";
      tableHtml += "<td style='" + cellStyle + "'>" + cell + "</td>";
    });
    tableHtml += "</tr>";
  });

  tableHtml += "</table>";

  return tableHtml;
};
const filterByCurrentMonth = (data) => {
  const headers = data[0];
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  return [
    headers,
    ...data.slice(1).filter((row) => {
      const issueDate = new Date(row[headers.indexOf("transactionDate")]);
      return (
        issueDate.getMonth() === currentMonth &&
        issueDate.getFullYear() === currentYear
      );
    }),
  ];
};

const filterbyStatus = (data, status) => {
  const headers = data[0];
  const statusIndex = headers.indexOf("status");

  return [
    headers,
    ...data
      .slice(1)
      .filter((row) => row[statusIndex].toLowerCase() === status.toLowerCase()),
  ];
};

const loansSummary = (data) => {
  const headers = data[0];
  const requiredColumns = [
    "memberId",
    "amount",
    "transactionDate",
    "loanType",
    "loanBalance",
    "interestPaid",
    "pendingInterest",
  ];
  const requiredIndices = requiredColumns.map((column) =>
    headers.indexOf(column)
  );

  return data.map((row) => requiredIndices.map((index) => row[index]));
};

const getTopSaver = (data) => {
  const headers = data[0];
  const memberIdIndex = headers.indexOf("memberId");
  const amountIndex = headers.indexOf("amount");

  const saverAmounts = {};
  data.slice(1).forEach((row) => {
    const memberId = row[memberIdIndex];
    const amount = parseFloat(row[amountIndex].replace(/,/g, ""));
    saverAmounts[memberId] = (saverAmounts[memberId] || 0) + amount;
  });

  const topSaverId = Object.keys(saverAmounts).reduce((a, b) =>
    saverAmounts[a] > saverAmounts[b] ? a : b
  );

  return { topSaverId: topSaverId, topAmount: saverAmounts[topSaverId] };
};
