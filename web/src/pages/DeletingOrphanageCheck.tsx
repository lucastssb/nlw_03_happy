import React from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import api from "../services/api";

import "../styles/pages/deleting-orphanage-check.css";

export default function DeletingOrphanageCheck() {
  const { id } = useParams<Record<string, string | undefined>>();
  const query = useQuery();
  const history = useHistory();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  async function deleteOrphanage() {
    await api.delete(`dashboard/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${
          sessionStorage.getItem("token_happy_temp") ||
          localStorage.getItem("token_happy")
        }`,
      },
    });

    history.push('/dashboard');
  }
  return (
    <div id="page-deleting-orphanage-check">
      <div className="content-wrapper">
        <main id="confirmation-box">
          <h1>Excluir!</h1>
          <span>Tem certeza que deseja excluir {query.get("name")} </span>
          <div className="options">
            <Link to="/dashboard">Voltar</Link>
            <button onClick={deleteOrphanage}>Sim</button>
          </div>
        </main>
      </div>
    </div>
  );
}
