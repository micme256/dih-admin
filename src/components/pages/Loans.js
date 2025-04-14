import React, { useContext } from "react";
import RecentActivity from "../ui-components/RecentActivity";
import KeyMetrics from "../ui-components/KeyMetrics";
import TransactionsForm from "../elements/TransactionsForm";
import { useState, useEffect } from "react";
import useFetchFromSheet from "../../hooks/useFetchFromSheet";
import { MemberContext } from "../../App";

const Loans = () => {
  const [transactions, setTransactions] = useState([]);
  const { loading, fetchRequest } = useFetchFromSheet();
  const { metricObj} = useContext(MemberContext)

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

  const metricsData = {
    "Active Loans": `${metricObj?.activeLoans}`,
    "Loans Sum": metricObj?.loanSum,
    "Interest Earned": metricObj?.interest,
    "Interest in Arrears": metricObj?.interestArrears,
  };

  return (
    <>
      <KeyMetrics metricsData={metricsData}/>
      {loading && <p className="loading">Loading...</p>}
      {transactions.length > 0 && (
        <RecentActivity recentActivity={transactions} />
      )}
    </>
  );
};

export default Loans;
