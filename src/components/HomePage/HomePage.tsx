import 'bulma/css/bulma.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Vocabular } from '../../types/Vocabular';
import './HomePage.css';
import { deleteItem, removeWords } from '../../store/wordsSlice';
import { useAppDispatch, useAppSelector } from '../../hook';

type Props = {
  setSelectedId: (id: number) => void,
};

export const HomePage: React.FC<Props> = ({
  setSelectedId,
}) => {
  const words: Vocabular[] = useAppSelector(state => state.words.words);
  const [visibleWord, setVisibleWord] = useState<Vocabular[]>([...words]);

  const dispatch = useAppDispatch();

  const deleteAll = () => dispatch(removeWords([]));

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

  useEffect(() => {
    setVisibleWord([...words]);
  }, [words]);

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
            onClick={() => deleteAll()}
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
                        onClick={() => dispatch(deleteItem(word.id))}
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
