import { useState, useEffect, useContext } from "react";
import { getInputAttributes } from "../components/helper-functions/getInputAttributes";
import { MemberContext } from "../App";
import { arraysToOjects } from "../components/helper-functions/arraysToObjects";

const useTransactionForm = (initialTransaction = {}) => {
  const isEditing =
    initialTransaction.transactionType !== "loanRepay" &&
    !!initialTransaction.transactionId;
  const [transaction, setTransaction] = useState(
    isEditing || initialTransaction.transactionType === "loanRepay"
      ? { ...initialTransaction }
      : {
          transactionType: initialTransaction.transactionType,
          transactionId: "",
          memberId: "",
          amount: "",
          transactionDate: new Date().toISOString().split("T")[0],
          loanType: "",
        }
  );
  const { accountsData } = useContext(MemberContext);
  const members = arraysToOjects(accountsData)
  console.log(members)

  const defautInputAttributes = getInputAttributes(
    members,
    initialTransaction.transactionType
  );
  const [inputAttributes, setInputAttributes] = useState(defautInputAttributes);

  const getMemberName = (memberId) => {
    const member = members.find((m) => m["Member ID"] === memberId);
    return member ? member["first Name"] : "";
  };

  useEffect(() => {
    const newFields = getInputAttributes(members, transaction.transactionType);
    const mergedFields = [...defautInputAttributes];
    if (transaction.transactionType === "expenditures" || transaction.transactionType === "loanRepay") {
      setInputAttributes(newFields);
      return;
    }
    newFields.forEach((newField) => {
      if (
        !mergedFields.some(
          (existingField) => existingField.name === newField.name
        )
      ) {
        mergedFields.push(newField);
      }
    });
    setInputAttributes(mergedFields);
  }, [transaction.transactionType]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTransaction((prev) => {
      const newValues = { ...prev, [name]: value };

      // Auto-update memberName when memberId changes
      if (name === "memberId") {
        newValues["memberName"] = getMemberName(value);
      }
      return newValues;
    });
  };

  return {
    transaction,
    setTransaction,
    inputAttributes,
    handleChange,
    isEditing,
  };
};

export default useTransactionForm;
