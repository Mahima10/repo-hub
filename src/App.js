import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RepoList from './Pages/RepoList';
import RepoDetails from './Pages/RepoDetails';
import Header from './components/Header';

import './App.css';
import { useEffect, useState } from 'react';
import { fetchRepos } from './api';

function App() {
  const [repos, setRepos] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRepos()
        updateRepos(data)
      } catch (error) {
        console.error("Error fetching repos", error)
        // TODO: In case of missing repos, pick it from storage, if available then refresh
        // the tool.
      }
    }
    fetchData()
  }, []);

  const updateRepos = (filteredRepos) => {
    setRepos(filteredRepos)
  }

  return (
    <BrowserRouter>
      <Header repos = {repos} updateRepos={updateRepos}/>
      <Routes>
        <Route path="/" element={<RepoList repos={repos}/>} />
        <Route path="/repo/:name" element={<RepoDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
