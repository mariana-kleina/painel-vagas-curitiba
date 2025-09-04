import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';
import styles from './JobDetails.module.css';

const API_URL = 'https://68b9e56d6aaf059a5b59078f.mockapi.io/vagas';

function JobDetails() {
  const { id } = useParams(); 

  const [vaga, setVaga] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const buscarVaga = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setVaga(response.data);
      } catch (error) {
        setErro('Não foi possível encontrar a vaga solicitada.');
        console.error("Erro ao buscar detalhes da vaga:", error);
      } finally {
        setCarregando(false);
      }
    };

    buscarVaga();
  }, [id]);

  if (carregando) {
    return <Spinner />;
  }

  if (erro) {
    return <p className={styles.erro}>{erro}</p>;
  }

  return (
    <div className={styles.detailsContainer}>
      <h2 className={styles.titulo}>{vaga.titulo}</h2>
      <h3 className={styles.empresa}>{vaga.empresa}</h3>
      <p className={styles.localizacao}>{vaga.localizacao}</p>
      <div className={styles.tagsContainer}>
        {vaga.tags.map(tag => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>
      
      {}
      <p className={styles.descricao}>{vaga.descricao}</p>
    </div>
  );
}

export default JobDetails;