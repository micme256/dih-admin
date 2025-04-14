import React from "react";
import RecentActivity from "../ui-components/RecentActivity";
import KeyMetrics from "../ui-components/KeyMetrics";
import TransactionsForm from "../elements/TransactionsForm";
import { useState, useEffect } from "react";
import useFetchFromSheet from "../../hooks/useFetchFromSheet";

const Loans = () => {
  const [transactions, setTransactions] = useState([]);
  const { loading, fetchRequest } = useFetchFromSheet();

  useEffect(() => {
    const requestData = async () => {
      try {
        const requestOptions = {
          dataType: "transactions",
          transactionType: "loans",
          limit: 10,
        };
        const response = await fetchRequest(requestOptions);

        if (response.status !== "success") {
          throw new Error(response.message);
        }
        setTransactions(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    requestData();
  }, []);

  return (
    <>
      <KeyMetrics />
      {loading && <p className="loading">Loading...</p>}
      {transactions.length > 0 && (
        <RecentActivity recentActivity={transactions} />
      )}
      {/* {
        <TransactionsForm
          initialTransaction={{ transactionType: "loans" }}
          formHeader="NEW LOAN"
        />
      } */}
    </>
  );
};

export default Loans;
