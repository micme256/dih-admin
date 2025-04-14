import React from "react";
import TransactionsForm from "../elements/TransactionsForm";
import { useLocation, useNavigate } from "react-router-dom";
import useTransactionActions from "../../hooks/useTransactionActions ";

const DataFeedback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, deleteTransaction, handleEdit } = useTransactionActions();

  const { response, undoMode, editMode } = location.state || {};

  if (!editMode) {
    if (!response || response.status !== "success") {
      console.log("error", response?.message);
      return null;
    }
  }
  const { message, data: addedData } = response;
  return (
    <div className="success-modal">
      {loading && <p className="loading">loading...</p>}
      {editMode ? (
        <TransactionsForm
          initialTransaction={response}
          formHeader="EDIT TRANSACTION DETAILS"
        />
      ) : (
        <div className="success-content">
          <h2>
            {undoMode ? "⏪ Transaction Deleted!" : "✅ Submission Successful!"}
          </h2>
          <p>{message}</p>
          <table>
            <tbody>
              {Object.entries(addedData).map(([key, value]) => (
                <tr key={key}>
                  <td className="key">
                    {key.replace(/([a-z])([A-Z])/g, "$1 $2")}
                  </td>
                  <td className="value">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="button-group">
            {!undoMode && (
              <button
                className="undo-btn"
                onClick={() => deleteTransaction(addedData)}
              >
                ⏪ Undo
              </button>
            )}
            {!undoMode && (
              <button
                className="edit-btn"
                onClick={() => handleEdit(addedData)}
              >
                ✏️ Edit
              </button>
            )}
            <button onClick={() => navigate("/")}>✅ OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataFeedback;
