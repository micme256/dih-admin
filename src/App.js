import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/pages/Nav";
import Dashboard from "./components/pages/Dashboard";
import Loans from "./components/pages/Loans";
import { createContext, useState, useEffect } from "react";
import Transactions from "./components/pages/Transactions";
import DataFeedback from "./components/ui-components/DataFeedback";
import LoanClearing from "./components/pages/LoanClearing";
import useFetchFromSheet from "./hooks/useFetchFromSheet";

export const MemberContext = createContext({});

function App() {
  const [generalData, setGeneralData] = useState({})
  const location = useLocation();
  const { loading, fetchRequest } = useFetchFromSheet();
  useEffect(() => {
      const requestData = async () => {
        try {
          const requestOptions = {
            dataType: "generalData",
          };
          const response = await fetchRequest(requestOptions);
  
          if (response.status !== "success") {
            throw new Error(response.message);
          }
          setGeneralData(response.data);
        } catch (error) {
          console.log(error.message);
        }
      };
      requestData();
    }, []);

    const {accountsData, metricObj} = generalData
  
    if (loading || !accountsData) {
      return <div className="loading-screen">Loading data...</div>;
    }

  return (
    <>
      <MemberContext.Provider value={{ accountsData, metricObj }}>
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
