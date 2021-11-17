import { GlobalStyle } from "./styles/global";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";

import Modal from "react-modal";
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";

Modal.setAppElement("#root");

export function App() {
  const [isNewTrasactionModalOpen, setIsNewTrasactionModalOpen] =
    useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTrasactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTrasactionModalOpen(false);
  }

  return (
    <>
      <GlobalStyle />
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTrasactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </>
  );
}
