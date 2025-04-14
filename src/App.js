import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/pages/Nav";
import Dashboard from "./components/pages/Dashboard";
import Loans from "./components/pages/Loans";
import { createContext } from "react";
import Transactions from "./components/pages/Transactions";
import DataFeedback from "./components/ui-components/DataFeedback";
import LoanClearing from "./components/pages/LoanClearing";

export const MemberContext = createContext(null);

function App() {
  const location = useLocation();
  const members = [
    {
      memberId: "DIH/0002",
      memberName: "GASTER",
      memberEmail: "gastermukasa@gmail.com",
      memberPhone: "0702530133/0777165396",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0003",
      memberName: "BARYAMUJURA",
      memberEmail: "",
      memberPhone: "",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0004",
      memberName: "MUGASHA",
      memberEmail: "",
      memberPhone: "",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0005",
      memberName: "ROBERT",
      memberEmail: "robertturyamureba@yahoo.com",
      memberPhone: "0777043143/0705038332",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0006",
      memberName: "ROBERT",
      memberEmail: "",
      memberPhone: "",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0007",
      memberName: "PATRICIA",
      memberEmail: "dralicenakiberu222@gmail.com",
      memberPhone: "0726187474/0750370549",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0008",
      memberName: "PAULO",
      memberEmail: "",
      memberPhone: "",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0009",
      memberName: "ESTHER",
      memberEmail: "bulumaesther@gmail.com",
      memberPhone: "0763781570",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0010",
      memberName: "DAVID",
      memberEmail: "",
      memberPhone: "",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0011",
      memberName: "MARION",
      memberEmail: "",
      memberPhone: "",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0012",
      memberName: "IRENE",
      memberEmail: "irahcade@gmail.com",
      memberPhone: "0784535503/ 0704435382",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0013",
      memberName: "OCHIENG",
      memberEmail: "",
      memberPhone: "",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0014",
      memberName: "CISSY",
      memberEmail: "",
      memberPhone: "",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0015",
      memberName: "SHALLON",
      memberEmail: "",
      memberPhone: "",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0016",
      memberName: "SEDRACK",
      memberEmail: "",
      memberPhone: "",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0017",
      memberName: "DIDAS",
      memberEmail: "",
      memberPhone: "",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0018",
      memberName: "COLLINS",
      memberEmail: "",
      memberPhone: "",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0020",
      memberName: "PATRICK",
      memberEmail: "",
      memberPhone: "",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0021",
      memberName: "SANGALO",
      memberEmail: "",
      memberPhone: "",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0023",
      memberName: "SAMUEL",
      memberEmail: "",
      memberPhone: "",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0024",
      memberName: "JULIUS",
      memberEmail: "nyiringangojulius19@gmail.com",
      memberPhone: "0700512877/0773120743",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0025",
      memberName: "MARK ASH",
      memberEmail: "",
      memberPhone: "",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0026",
      memberName: "PATRICK",
      memberEmail: "",
      memberPhone: "",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0027",
      memberName: "ESTHER",
      memberEmail: "murungiessie@gmail.com",
      memberPhone: "0770646857",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0030",
      memberName: "ISAAC",
      memberEmail: "erayurich@gmail.com",
      memberPhone: "0785685820/0702068370",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0032",
      memberName: "RICHARD",
      memberEmail: "",
      memberPhone: "",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0033",
      memberName: "KEVIN",
      memberEmail: "",
      memberPhone: "",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0034",
      memberName: "WILLIAM",
      memberEmail: "",
      memberPhone: "",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0035",
      memberName: "BONNY",
      memberEmail: "bonnyonyum@gmail.com",
      memberPhone: "0775297105/0756383621",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0036",
      memberName: "JOHNSTONE",
      memberEmail: "",
      memberPhone: "",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0037",
      memberName: "STEPHEN",
      memberEmail: "",
      memberPhone: "",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0038",
      memberName: "BREANDAH",
      memberEmail: "",
      memberPhone: "",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0039",
      memberName: "AGNES",
      memberEmail: "",
      memberPhone: "",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0040",
      memberName: "DENIS",
      memberEmail: "denotwob@gmail.com",
      memberPhone: "0704384590",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0041",
      memberName: "PAULINE",
      memberEmail: "",
      memberPhone: "",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0042",
      memberName: "SANON",
      memberEmail: "bamwesigyesanon@gmail.com",
      memberPhone: "784260051",
      memberRole: "MEMBER",
    },
    {
      memberId: "DIH/0043",
      memberName: "AMBROSE",
      memberEmail: "ambrosetsemali@gmail.com",
      memberPhone: "784901723",
      memberRole: "MEMBER",
    },
  ];
  return (
    <>
      <MemberContext.Provider value={{ members }}>
        {location.pathname !== "/data-feedback" && <Nav />}
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="loan" element={<Loans />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="data-feedback" element={<DataFeedback />} />
          <Route path="loan-clearing" element={<LoanClearing />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </MemberContext.Provider>
    </>
  );
}

export default App;
