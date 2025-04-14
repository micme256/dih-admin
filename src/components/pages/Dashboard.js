import React, { useContext } from "react";
import KeyMetrics from "../ui-components/KeyMetrics";
import Contribution from "../ui-components/Contribution";
import { MemberContext } from "../../App";

const Dashboard = () => {
  const {accountsData: contributions, metricObj} = useContext(MemberContext)
  const metricsData = {
    "Total Savings": metricObj?.totalSavings,
    "Total Shares": `${metricObj?.totalShares}`,
    "Share Capital": metricObj?.shareCapital,
    "Membership": metricObj?.membership,
    "Expenditures": metricObj?.expenditures,
    "Current Bal": metricObj?.currentBal,
  };

  return (
    <>
      <KeyMetrics metricsData={metricsData}/>
      <Contribution contributions={contributions} />
    </>
  );
};

export default Dashboard;
