import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import JobList from './components/JobList';
import JobDetails from './components/JobDetails';
import AddJob from './components/AddJob';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/" className="header-link">
          <h1>Painel de Vagas de T.I. – Curitiba</h1>
        </Link>
        <Link to="/adicionar" className="add-job-button">
          Adicionar Vaga
        </Link>
      </header>
      
      <main className="App-main">
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/vaga/:id" element={<JobDetails />} />
          {}
          <Route path="/adicionar" element={<AddJob />} /> 
        </Routes>
      </main>
    </div>
  );
}

export default App;