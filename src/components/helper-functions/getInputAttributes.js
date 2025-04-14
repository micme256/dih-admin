export const getInputAttributes = (members, transactionType = "default") => {
  const commonFields = [
    {
      type: "select",
      name: "memberId",
      label: "Member ID",
      options: members.map((member) => member.memberId),
    },
    {
      type: "text",
      name: "memberName",
      readOnly: true,
      label: "Name",
    },
    {
      type: "number",
      name: "amount",
      label: "Amount",
    },
    {
      type: "date",
      name: "transactionDate",
      label: "Date",
    },
  ];

  const transactionSpecificFields = { 
    newLoan: [
      {
        type: "select",
        name: "transactionType",
        label: "Transaction Type",
        options: ["newLoan", "savings", "penalties", "expenditures",],
      },
      {
        type: "select",
        name: "loanType",
        label: "Loan Type",
        options: ["short-term", "instant-loan"],
      },
      {
        type: "number",
        name: "duration",
        label: "Duration",
      },
    ],
    savings: [],
    amortisation: [],
    interest: [],
    penalties: [],
    expenditures: [
      {
        type: "select",
        name: "transactionType",
        label: "Transaction Type",
        options: ["newLoan", "savings", "penalties", "expenditures",],
      },
      {
        type: "text",
        name: "item",
        label: "Item",
      },
      {
        type: "number",
        name: "unitPrice",
        label: "Unit Price",
      },
      {
        type: "number",
        name: "amount",
        label: "Amount",
      },
      {
        type: "date",
        name: "transactionDate",
        label: "Date",
      },
    ],
    loanRepay: [
      {
        type: "text",
        name: "transactionType",
        label: "Transaction Type",
        readOnly: true,
      },
      {
        type: "text",
        name: "memberId",
        readOnly: true,
        label: "Member ID",
        // options: members.map((member) => member.memberId),
      },
      {
        type: "text",
        name: "memberName",
        readOnly: true,
        label: "Name",
      },
      {
        type: "number",
        name: "amount",
        readOnly: true,
        label: "Amount due",
      },
      {
        type: "number",
        name: "pendingInterest",
        label: "Pending Interest",
        readOnly: true,
      },
      {
        type: "number",
        name: "amountPaid",
        label: "Amount paid",
      },
      {
        type: "date",
        name: "transactionDate",
        label: "Date",
      },
    ],
    default: [
      {
        type: "select",
        name: "transactionType",
        label: "Transaction Type",
        options: [
          "newLoan",
          "savings",
          "shares",
          "penalties",
          "expenditures",
        ],
      },
    ],
  };

  return transactionType === "expenditures" || transactionType === "loanRepay" 
  ? transactionSpecificFields[transactionType] 
  : [...transactionSpecificFields[transactionType] || transactionSpecificFields.default, ...commonFields];
};
