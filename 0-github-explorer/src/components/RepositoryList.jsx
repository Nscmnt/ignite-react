import React, { useState } from "react";
import RepositoryItem from "./RepositoryItem";

import "../styles/repository.scss";

const RepositoryList = () => {
  const [repositories, setRepositories] = useState([]);
  const [githubUser, setGithubUser] = useState("");
  const [filter, setFilter] = useState("users");
  const [message, setMessage] = useState("Sem Repositório disponível...");

  function handleChange(e) {
    setGithubUser(e.target.value);
  }

  function handleRadio({ target }) {
    setFilter(target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`https://api.github.com/${filter}/${githubUser}/repos`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Not Found") {
          setMessage(
            "Repositório não encontrado: Verifique valor informado ou filtro."
          );
          setRepositories([]);
        } else {
          setRepositories(data);
          setMessage(null);
        }
      })
      .catch((err) =>
        setMessage(
          `Repositório não encontrado: Verifique valor informado ou filtro. \n ${err}`
        )
      );
  }

  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>
      <form className="form-search" onSubmit={handleSubmit}>
        <input
          type="text"
          value={githubUser}
          onChange={handleChange}
          placeholder="Buscar repositório..."
        />
        <div className="filter-options">
          <label>Pesquisar por: </label>
          <label>
            <input
              type="radio"
              value="users"
              checked={filter === "users"}
              onChange={handleRadio}
            />
            Usuário
          </label>
          <label>
            <input
              type="radio"
              value="orgs"
              checked={filter === "orgs"}
              onChange={handleRadio}
            />
            Empresa
          </label>
        </div>
      </form>
      <ul>
        {repositories.length > 0 ? (
          repositories.map((repository, i) => (
            <RepositoryItem
              key={repository.name}
              repository={repository}
              delay={50 * i}
            />
          ))
        ) : (
          <p className="message">{message}</p>
        )}
      </ul>
    </section>
  );
};

export default RepositoryList;
