import 'bulma/css/bulma.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Vocabular } from '../../types/Vocabular';
import './HomePage.css';

type Props = {
  words: Vocabular[],
  setSelectedId: (id: number) => void,
  setWords: (arr: Vocabular[]) => void,
};

export const HomePage: React.FC<Props> = ({
  words, setSelectedId, setWords,
}) => {
  const [visibleWord, setVisibleWord] = useState<Vocabular[]>([...words]);
  // const [typeSelect, setTypeSelect] = useState('Initial');

  const deleteWord = (id: number) => {
    const resultList = words.filter(word => word.id !== id);

    setWords(resultList);
    setVisibleWord(resultList);
  };

  const visibleList = (str: string) => {
    switch (str) {
    case 'Initial':
      setVisibleWord([...words]);
      break;
    case 'А-Я':
      setVisibleWord([...words]
        .sort((w1, w2) => w1.word.localeCompare(w2.word)));
      break;
    case 'Я-А':
      setVisibleWord([...words]
        .sort((w1, w2) => w2.word.localeCompare(w1.word)));
      break;
    case 'A-Z':
      setVisibleWord([...words]
        .sort((w1, w2) => w1.translation.localeCompare(w2.translation)));
      break;
    case 'Z-A':
      setVisibleWord([...words]
        .sort((w1, w2) => w2.translation.localeCompare(w1.translation)));
      break;

    default:
      break;
    }
  };

  return (
    <div className="box is-background">
      {words.length === 0
        ? (<div className="box">
          <p className="title is-1 has-text-centered">
            Список слів порожній.
          </p>
          <button
            className="new-word-btn"
            onClick={() => setSelectedId(1)}
          >
            <Link
              className="test-link"
              to="/new-words"
            >
              Додати нові слова
            </Link>
          </button>
        </div>)
        : (<div className="box is-flex is-justify-content-space-around">
          <button
            className="new-word-btn"
            onClick={() => setSelectedId(1)}
          >
            <Link
              className="test-link"
              to="/new-words"
            >
              Додати нові слова
            </Link>
          </button>
          <div className="select">
            <select
              onChange={(e) => {
                visibleList(e.target.value);
              }}
            >
              <option value="Initial">Initial</option>
              <option value="А-Я">А-Я(UA)</option>
              <option value="Я-А">Я-А(UA)</option>
              <option value="A-Z">А-Z(ENG)</option>
              <option value="Z-A">Z-А(ENG)</option>
            </select>
          </div>
          <button
            className="button is-danger"
            onClick={() => setWords([])}
          >
            Видалити всі
          </button>
        </div>
        )}

      {words.length > 0 && (
        <div className="words-list">
          <table className="table">
            <thead>
              <tr>
                <th className="title is-5">Pos</th>
                <th className="title is-5">
                  Ukrainian
                </th>
                <th className="title is-5">
                  English
                </th>
                <th className="title is-5 has-text-centered">Delete</th>
              </tr>
            </thead>

            <tbody>
              {visibleWord.map((word, index) => (
                <tr
                  key={word.id}
                >
                  <td className="subtitle is-5">{index + 1}.</td>
                  <td className="subtitle is-5">{word.word}</td>
                  <td className="subtitle is-5">{word.translation}</td>
                  <td className="delete-item">
                    <div className="is-flex is-justify-content-center">
                      <button
                        className="delete"
                        onClick={() => deleteWord(word.id)}
                      >
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
