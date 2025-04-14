import React from "react";
import KeyMetrics from "../ui-components/KeyMetrics";
import Contribution from "../ui-components/Contribution";
import TransactionsForm from "../elements/TransactionsForm";

const Dashboard = () => {
  const contributions = [
    ["Member ID", "Name", "Total Shares", "Account Bal"],
    ["DIH/0002", "GASTER", 65, 505000],
    ["DIH/0003", "RAM BARYAMUJURA", 3, 10000],
    ["DIH/0004", "STEVEN MUGASHA", 8, 10000],
    ["DIH/0005", "ROBERT", 1, 10000],
    ["DIH/0006", "ROBERT", 24, 520000],
    ["DIH/0007", "ALICE PATRICIA", 4, 111000],
    ["DIH/0008", "PAULO", 3, 10000],
    ["DIH/0009", "ESTHER", 7.5, 700000],
    ["DIH/0010", "DAVID", 4, 60000],
    ["DIH/0011", "MARION", 3, 10000],
    ["DIH/0012", "IRENE", 5, 90000],
    ["DIH/0013", "ALLAN OCHIENG", 1, 10000],
    ["DIH/0014", "CISSY", 3, 10000],
    ["DIH/0015", "SHALLON", 3, 10000],
    ["DIH/0016", "SEDRACK", 1, 10000],
    ["DIH/0017", "DIDAS", 1, 10000],
    ["DIH/0018", "COLLINS", 1, 10000],
    ["DIH/0020", "PATRICK", 3, 10000],
    ["DIH/0021", "IVAN SANGALO", 1, 10000],
    ["DIH/0023", "SAMUEL", 1, 10000],
    ["DIH/0024", "JULIUS", 10, 510000],
    ["DIH/0025", "MARK ASH", 2, 10000],
    ["DIH/0026", "PATRICK", 1, 10000],
    ["DIH/0027", "ESTHER", 3, 110000],
    ["DIH/0030", "RICHARD ISAAC", 1, 10000],
    ["DIH/0032", "RICHARD", 5, 10000],
    ["DIH/0033", "KEVIN", 5, 10000],
    ["DIH/0034", "WILLIAM", 1, 10000],
    ["DIH/0035", "BONNY", 2, 10000],
    ["DIH/0036", "JOHNSTONE", 2, 10000],
    ["DIH/0037", "STEPHEN", 1, 10000],
    ["DIH/0038", "BREANDAH", 1, 10000],
    ["DIH/0039", "AGNES", 5, 100000],
    ["DIH/0040", "DENIS", 2, 20000],
    ["DIH/0041", "PAULINE", 1, 10000],
  ];

  return (
    <>
      <KeyMetrics />
      <Contribution contributions={contributions} />
      {/* <TransactionsForm
        initialTransaction={{ transactionType: "savings" }}
        formHeader="NEW CONTRIBUTION"
      /> */}
    </>
  );
};

export default Dashboard;
