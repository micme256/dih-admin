import React from "react";
import RecentActivity from "../ui-components/RecentActivity";
import TransactionsForm from "../elements/TransactionsForm";
import { useState, useEffect } from "react";
import useFetchFromSheet from "../../hooks/useFetchFromSheet";

const Transactions = () => {
  const [transactions, setTransactions] = useState({});
  const { loading, fetchRequest } = useFetchFromSheet();

  useEffect(() => {
    const requestData = async () => {
      try {
        const requestOptions = {
          dataType: "recentTransactions",
          limit: 20,
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
      {loading && <p className="loading">Loading...</p>}
      {transactions.length > 0 && (
        <RecentActivity recentActivity={transactions} />
      )}
      <TransactionsForm formHeader="NEW TRANSACTION" />
    </>
  );
};

export default Transactions;
