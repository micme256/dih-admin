import React from "react";
import FormInput from "./FormInput";
import useTransactionForm from "../../hooks/useTransactionForm";
import useTransactionActions from "../../hooks/useTransactionActions ";

const TransactionsForm = ({
  initialTransaction,
  formHeader = "NEW TRANSACTION",
}) => {
  let { transaction, inputAttributes, handleChange, isEditing } =
    useTransactionForm(initialTransaction);
  const { loading, submitTransaction, handleLoanRepayment } = useTransactionActions();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if(transaction.transactionType==="loanRepay"){
      transaction = handleLoanRepayment(transaction);
    }
    submitTransaction(transaction, isEditing);
  };

  return (
    <div className="transaction-form">
      <h1>{formHeader}</h1>
      {loading && <p className="loading">Submitting...</p>}
      {/* {error && <p style={{ color: "red" }}>Error: {response.error}</p>} */}

      <form onSubmit={handleFormSubmit}>
        {inputAttributes.map((inputElement) => (
          <FormInput
            key={inputElement.name}
            {...inputElement}
            value={transaction[inputElement.name] || ""}
            onChange={handleChange}
          />
        ))}
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : isEditing ? "Update" : "Enter"}
        </button>
      </form>
    </div>
  );
};

export default TransactionsForm;
