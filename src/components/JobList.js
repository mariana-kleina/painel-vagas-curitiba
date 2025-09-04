import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from './JobCard';
import Spinner from './Spinner';
import '../App.css'; 

const API_URL = 'https://68b9e56d6aaf059a5b59078f.mockapi.io/vagas';

function JobList() {
  const [vagas, setVagas] = useState([]);
  const [vagasFiltradas, setVagasFiltradas] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const buscarVagas = async () => {
      try {
        const response = await axios.get(API_URL);
        setVagas(response.data);
        setVagasFiltradas(response.data);
      } catch (error) {
        setErro('Não foi possível carregar as vagas. Tente novamente mais tarde.');
        console.error("Erro ao buscar vagas: ", error);
      } finally {
        setCarregando(false);
      }
    };
    buscarVagas();
  }, []);

  useEffect(() => {
    const termoBuscaLower = termoBusca.toLowerCase();
    const filtradas = vagas.filter(vaga => 
      vaga.tags.some(tag => tag.toLowerCase().includes(termoBuscaLower))
    );
    setVagasFiltradas(filtradas);
  }, [termoBusca, vagas]);

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          placeholder="Filtre por tecnologia (ex: React, Java...)"
          className="search-input"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
        />
      </div>
      
      {carregando && <Spinner />}
      {erro && <p className="feedback-text error-text">{erro}</p>}
      {!carregando && !erro && (
        <div className="job-list">
          {vagasFiltradas.length > 0 ? (
            vagasFiltradas.map(vaga => (
              <JobCard key={vaga.id} vaga={vaga} />
            ))
          ) : (
            <p className="feedback-text">Nenhuma vaga encontrada com este filtro.</p>
          )}
        </div>
      )}
    </>
  );
}

export default JobList;