import React from "react";

const RepositoryItem = ({ repository, delay }) => {
  return (
    <li
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      <strong>{repository.name}</strong>
      <p>{repository.description || "Sem descrição disponível"}</p>
      <a href={repository.html_url} target="_blank" rel="noreferrer">
        Acessar Repositório
      </a>
    </li>
  );
};

export default RepositoryItem;
