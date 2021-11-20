import { Summary } from "../Summary";
import { TransactionsTable } from "../TransactionsTables";
import { Conteiner } from "./styles";

export const Dashboard = () => {
  return (
    <Conteiner>
      <Summary />
      <TransactionsTable />
    </Conteiner>
  );
};
