import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import styles from './AddJob.module.css';

const API_VAGAS_URL = 'https://68b9e56d6aaf059a5b59078f.mockapi.io/vagas';

function AddJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: '',
    empresa: '',
    localizacao: '',
    descricao: '',
    tags: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newVaga = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim())
    };

    try {
      await axios.post(API_VAGAS_URL, newVaga);
      
      alert('Vaga cadastrada com sucesso!');
      navigate('/'); 

    } catch (error) {
      alert('Erro ao cadastrar a vaga. Tente novamente.');
      console.error('Erro no envio do formulário:', error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Cadastrar Nova Vaga</h2>
      <form onSubmit={handleSubmit}>
        {}
        <div className={styles.formGroup}>
          <label htmlFor="titulo">Título da Vaga</label>
          <input type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="empresa">Nome da Empresa</label>
          <input type="text" id="empresa" name="empresa" value={formData.empresa} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="localizacao">Localização</label>
          <input type="text" id="localizacao" name="localizacao" value={formData.localizacao} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="descricao">Descrição da Vaga</label>
          <textarea id="descricao" name="descricao" rows="6" value={formData.descricao} onChange={handleChange} required></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="tags">Tags de Tecnologia (separadas por vírgula)</label>
          <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} placeholder="Ex: React, Node.js, SQL" />
        </div>
        <button type="submit" className={styles.submitButton}>Cadastrar Vaga</button>
      </form>
    </div>
  );
}

export default AddJob;