import { useState, useEffect, useContext } from "react";
import { getInputAttributes } from "../components/helper-functions/getInputAttributes";
import { MemberContext } from "../App";

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
  const { members } = useContext(MemberContext);
  const defautInputAttributes = getInputAttributes(
    members,
    initialTransaction.transactionType
  );
  const [inputAttributes, setInputAttributes] = useState(defautInputAttributes);

  const getMemberName = (memberId) => {
    const member = members.find((m) => m.memberId === memberId);
    return member ? member.memberName : "";
  };

  useEffect(() => {
    const newFields = getInputAttributes(members, transaction.transactionType);
    const mergedFields = [...defautInputAttributes];
    if (transaction.transactionType === "expenditures" || "loanRepay") {
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
