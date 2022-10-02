import classNames from 'classnames';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Results } from '../../types/Results';
import '../HomePage/HomePage.css';
import { Modal } from '../Modal/Modal';
import './ResultList.css';

type Props = {
  results: Results[],
  winner: boolean,
  setWinner: (state: boolean) => void,
  setSelectedId: (num: number) => void,
  setResults: (res: Results[]) => void,
};

export const ResultsList: React.FC<Props> = ({
  results, winner, setWinner, setSelectedId, setResults,
}) => {
  const [isModal, setIsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Results>(results[0]);

  const averageRate = (arr: Results[]) => {
    return Math.ceil(arr
      .reduce((sum, el) => sum + el.rate, 0) / arr.length);
  };

  const selectUser = (id: number) => {
    const res = results.find(result => result.id === id);

    if (res !== undefined) {
      setSelectedUser(res);
    }
  };

  return (
    <div className="box is-background">
      {results.length === 0 && (
        <div className="box">
          <p className="title is-1 has-text-centered">
            Результатів поки немає.
          </p>
          <button
            className="new-word-btn"
            onClick={() => setSelectedId(2)}
          >
            <Link
              className="test-link"
              to="/knowledge-test"
            >
              Перевірити знання
            </Link>
          </button>
        </div>
      )}
      {winner && (
        <div className="box result-box">
          <h1 className="title is-2 has-text-centered">
            {`Вітаємо, ${results[results.length - 1].userName}!`}
          </h1>
          <div className="result-rate">
            <p className="icon-text is-3 has-text-centered">
              {`Ваш результат - ${results[results.length - 1].rate} %`}
            </p>
            <div
              className={classNames(
                'bal',
                { 'bal-1': results[results.length - 1].rate >= 0 },
                { 'bal-2': results[results.length - 1].rate >= 20 },
                { 'bal-3': results[results.length - 1].rate >= 40 },
                { 'bal-4': results[results.length - 1].rate >= 60 },
                { 'bal-5': results[results.length - 1].rate >= 80 },
              )}
            >
            </div>
          </div>
          <p className="title is-4 has-text-centered">
            {`Час виконання - ${results[results.length - 1].time} хв.`}
          </p>
          <div className="is-flex is-justify-content-space-around">
            <button
              onClick={() => setSelectedId(2)}
              className="new-word-btn"
            >
              <Link
                className="test-link"
                to="/knowledge-test"
              >
                Пройти знову
              </Link>
            </button>
            <button
              className="button is-info"
              onClick={() => setWinner(false)}
            >
              Переглянути всі результати
            </button>
          </div>
        </div>
      )}
      {(!winner && results.length > 0) && (
        <>
          <div className="box is-flex is-justify-content-space-between">
            <div>
              {`Середній відсоток активності ${averageRate(results)} %`}
              <p>Клікніть по табличці, щоб переглянути деталі.</p>
            </div>
            <button
              className="button is-danger"
              onClick={() => setResults([])}
            >
              Видалити всі
            </button>
          </div>
          <div className="words-list">
            <table className="table">
              <thead>
                <tr>
                  <th className="title is-5">Pos</th>
                  <th className="title is-5">Ім'я</th>
                  <th className="title is-5">Результат</th>
                  <th className="title is-5">Дата виконання</th>
                </tr>
              </thead>

              <tbody>
                {results.map((result, i) => (
                  <tr
                    key={result.id}
                    className="table-item"
                    onClick={() => {
                      setIsModal(true);
                      selectUser(result.id);
                    }}
                  >
                    <td className="subtitle is-5">{i + 1}.</td>
                    <td className="subtitle is-5">{result.userName}</td>
                    <td className="subtitle is-5">{`${result.rate} %`}</td>
                    <td className="subtitle is-5">{result.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div></>
      )}
      {isModal && <Modal setIsModal={setIsModal} selectedUser={selectedUser} />}
    </div>
  );
};
