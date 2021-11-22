import React from "react";
import ReactDOM from "react-dom";
import { createServer, Model } from "miragejs";

import { App } from "./App";
import { TransactionsProvider } from "./TransactionsContext";

createServer({
  models: {
    transaction: Model,
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Criação de landing Page",
          type: "deposit",
          category: "Dev",
          amount: 5000,
          createAt: new Date("2021-10-15 14:00:00"),
        },
        {
          id: 2,
          title: "Criação de app",
          type: "deposit",
          category: "Dev",
          amount: 8000,
          createAt: new Date("2021-10-18 14:00:00"),
        },
        {
          id: 3,
          title: "Compra de veiculo",
          type: "withdraw",
          category: "bens",
          amount: 9000,
          createAt: new Date("2021-10-20 15:00:00"),
        },
      ],
    });
  },
  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", data);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <TransactionsProvider>
      <App />
    </TransactionsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
