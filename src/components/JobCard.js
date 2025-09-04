import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './JobCard.module.css';

function JobCard({ vaga }) {
  return (
    <Link to={`/vaga/${vaga.id}`} className={styles.link}>
      <div className={styles.card}>
        <h2 className={styles.titulo}>{vaga.titulo}</h2>
        <p className={styles.empresa}>{vaga.empresa}</p>
        <p className={styles.localizacao}>{vaga.localizacao}</p>
        <div className={styles.tagsContainer}>
          {vaga.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default JobCard;