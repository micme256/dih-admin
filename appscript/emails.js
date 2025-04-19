const transactionEmail = (transactionData) => {
  const { memberId, transactionType, transactionId, amount, transactionDate } =
    transactionData;
  const email = emailsById(memberId);
  const name = nameById(memberId);
  let transaction;
  switch (transactionType) {
    case "newLoan":
      transaction = "loan";
      break;
    case "shares":
      transaction = "shares purchase";
      break;
    case "interest":
      transaction = "interest payment";
      break;
    case "loanRepay":
      transaction = "loan payment";
      break;
    case "savings":
      transaction = "deposit";
      break;
    default:
      transaction = transactionType;
  }
  const subject = "New " + transaction + " recorded";
  const body = `Dear Mr. ${name} A new ${transaction} has been registered on your KIU ALUMNI DIH SACCO account on ${transactionDate}.
  TRANSACTION DETAILS:
  TRANSACTION ID: ${transactionId}
  AMOUNT: ${amount}.
  
  visit https://script.google.com/macros/s/AKfycbwGjkTeMGzxxwDjC0LZpmF2QVlq6QsVdiioWXEhsVM/dev to check your account
  
  Kind Regards: DIH TREASURY`;
  if (email) {
    sendEmails(subject, body, email);
  }
};

const sendEmails = (subject, body, email) => {
  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: body,
  });
};

const emailsById = (memberId) => {
  const memberInfo = getMemberInfoById(memberId);
  return memberInfo ? memberInfo.email : null;
};

const nameById = (memberId) => {
  const memberInfo = getMemberInfoById(memberId);
  return memberInfo ? memberInfo.name : null;
};

const emailsByPost = (position) => {
  const membersMap = membersInfoMap();
  const emails = [];
  for (const [, memberData] of membersMap.entries()) {
    if (memberData.position === position) {
      emails.push(memberData.email);
    }
  }
  return emails;
};
const getMemberInfoById = (memberId) => {
  const membersMap = membersInfoMap();
  return membersMap.get(memberId);
};
const membersInfoMap = () => {
  const sheetName = "Database";
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  const memberMap = new Map();
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const memberId = row[0];
    const memberDetails = {
      name: row[2],
      position: row[7],
      email: row[5],
    };
    memberMap.set(memberId, memberDetails);
  }
  return memberMap;
};
