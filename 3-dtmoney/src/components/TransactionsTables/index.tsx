import { Container } from "./styles";

export const TransactionsTable = () => {
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Desenvolvimento de WebSite</td>
            <td className="deposit"> R$12000</td>
            <td>Desenvolvimento</td>
            <td>12/11/2021</td>
          </tr>
          <tr>
            <td>Aluguel</td>
            <td className="withdraw">- R$1200</td>
            <td>Casa</td>
            <td>10/10/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};
