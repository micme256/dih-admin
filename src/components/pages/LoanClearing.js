import TransactionsForm from "../elements/TransactionsForm";
import { useLocation } from "react-router-dom";


const LoanClearing = () => {
    const location = useLocation();
    const { loanToClear } = location.state || {};
    return (
        <>
        <TransactionsForm
          initialTransaction={loanToClear}
          formHeader="CLEAR LOAN"
        />
        </>
    )
}

export default LoanClearing;