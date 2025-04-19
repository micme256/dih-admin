import { formatDate } from "../components/elements/formaDate";
import useFetchFromSheet from "./useFetchFromSheet";
import { useNavigate } from "react-router-dom";

const useTransactionActions = () => {
  const { loading, addRequest, editRequest, deleteRequest } =
    useFetchFromSheet();
  const navigate = useNavigate();

  const submitTransaction = async (transaction, isEditing) => {
    try {
      transaction.transactionDate = formatDate(transaction.transactionDate);
      const response = isEditing
        ? await editRequest(transaction)
        : await addRequest(transaction);

      if (response.status === "success") {
        navigate("/data-feedback", { state: { response } });
      } else {
        throw new Error(response.message || JSON.stringify(response));
      }
    } catch (error) {
      navigate("/data-feedback", {
        state: {
          response: {
            status: "error",
            message: error.message || "Unexpected error occurred.",
          },
        },
      });
    }
  };

  const deleteTransaction = async (transaction) => {
    try {
      const response = await deleteRequest(transaction);
      if (response.status === "success") {
        navigate("/data-feedback", { state: { response, undoMode: true } });
      }
    } catch (error) {
      navigate("/data-feedback", { state: { response: error } });
    }
  };

  const handleEdit = (transaction) => {
    navigate("/data-feedback", {
      state: { response: transaction, editMode: true },
    });
  };

  const handleLoanClearance = (loan) => {
    loan.transactionType = "loanRepay";
    navigate("/loan-clearing", {
      state: { loanToClear: loan },
    });
  };

  const handleLoanRepayment = (transaction) => {
    transaction.forLoanWithId = transaction.transactionId;
    delete transaction.transactionId;
    const interest = transaction.pendingInterest;
    if (interest > 0) {
      transaction.amount = transaction.amountPaid - interest;
      if (transaction.amount <= 0) {
        transaction.transactionType = "interest";
        transaction.amount = transaction.amountPaid;
      }
    }
    return transaction;
  };

  return {
    loading,
    submitTransaction,
    deleteTransaction,
    handleEdit,
    handleLoanClearance,
    handleLoanRepayment,
  };
};

export default useTransactionActions;
