import Amount from "../elements/Amount";
import { formatDate } from "../elements/formaDate";
import { formatAmount } from "../elements/formatAmount";
import { useState } from "react";
import useTransactionActions from "../../hooks/useTransactionActions ";

const RecentActivity = ({ recentActivity }) => {
  const [actionButtonsState, setActionButtonsState] = useState({});

  const { deleteTransaction, handleEdit, handleLoanClearance } = useTransactionActions();

  const toggleActionButtons = (activityId) => {
    setActionButtonsState((prevState) => ({
      [activityId]: !prevState[activityId],
    }));
  };

  return (
    <div className="recent-activity">
      {recentActivity.map((activity) => (
        <div
          className="activity-with-btns"
          key={activity.transactionId}
          onClick={(e) => {
            e.stopPropagation();
            toggleActionButtons(activity.transactionId);
          }}
        >
          <div className="activity" tabIndex="0">
            <div className="activity-left">
              <div className="fname">{activity.memberName}</div>
              <div
                className={`trans-type loan-type ${activity.transactionType}`}
              >
                {activity.transactionType && activity.loanType
                  ? `${activity.transactionType}-${activity.loanType}`
                  : activity.transactionType || activity.loanType || null}
              </div>
              <Amount amount={activity.amount} />
            </div>
            <div className="activity-right">
              {activity.status && (
                <div className={`${activity.status}`}>{activity.status}</div>
              )}
              <div className="date">
                {formatDate(new Date(activity.transactionDate))}
              </div>
              {activity.loanBalance && <div className="bal">
              Bal: {formatAmount(activity.loanBalance)}
              </div>}
              {activity.pendingInterest && (
                <div>Interest: {formatAmount(activity.pendingInterest)}</div>
              )}
            </div>
          </div>
          {actionButtonsState[activity.transactionId] && (
            <div className="button-group">
              <button
                key={`${activity.transactionId}-undo`}
                className="trans-delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTransaction(activity);
                }}
              >
                ⏪ Delete
              </button>
              <button
                key={`${activity.transactionId}-edit`}
                className="trans-edit-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(activity);
                }}
              >
                ✏ Edit
              </button>
              {activity?.status === "active" && <button
                key={`${activity.transactionId}-clear`}
                className="trans-clear-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLoanClearance(activity);
                }}
              >
                Clear Loan
              </button>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;
