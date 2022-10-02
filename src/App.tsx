import 'bulma/css/bulma.css';
import { useEffect, useState } from 'react';
import './App.css';

import {
  Route, Routes, Navigate,
} from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';

import { Navigation } from './components/Navigation/Navigation';
import { NewWordsForm } from './components/NewWordsForm/NewWordsForm';
import { ResultsList } from './components/ResultsList/ResultsList';
import { Testing } from './components/Testing/Testing';
import { Results } from './types/Results';
import { Vocabular } from './types/Vocabular';

export const App = () => {
  const [winner, setWinner] = useState<boolean>(false);

  const [words, setWords] = useState<Vocabular[]>(() => {
    const wordsFromStor = localStorage.getItem('words');

    try {
      return wordsFromStor ? JSON.parse(wordsFromStor) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('words', JSON.stringify(words));
  }, [words]);

  const [results, setResults] = useState<Results[]>(() => {
    const resultsFromStor = localStorage.getItem('results');

    try {
      return resultsFromStor ? JSON.parse(resultsFromStor) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('results', JSON.stringify(results));
  }, [results]);

  const [selectedId, setSelectedId] = useState<number>(() => {
    const selFromStor = localStorage.getItem('selectedId');

    try {
      return selFromStor ? JSON.parse(selFromStor) : 0;
    } catch (error) {
      return 0;
    }
  });

  useEffect(() => {
    localStorage.setItem('selectedId', JSON.stringify(selectedId));
  }, [selectedId]);

  return (
    <div className="App">
      <Navigation selectedId={selectedId} setSelectedId={setSelectedId} />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<HomePage
              words={words}
              setSelectedId={setSelectedId}
              setWords={setWords}
            />}
          />
          <Route
            path="/new-words"
            element={<NewWordsForm words={words} setWords={setWords} />}
          />
          <Route
            path="/knowledge-test"
            element={<Testing
              words={words}
              setResults={setResults}
              results={results}
              setWinner={setWinner}
              setSelectedId={setSelectedId}
            />}
          />
          <Route
            path="/results"
            element={<ResultsList
              results={results}
              winner={winner}
              setWinner={setWinner}
              setSelectedId={setSelectedId}
              setResults={setResults}
            />}
          />
          <Route
            path="/home"
            element={<Navigate to="/" />}
          />
        </Routes>
      </div>
    </div>
  );
};
