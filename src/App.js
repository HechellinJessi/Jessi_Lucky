import React, { useState } from 'react';
import './App.css';

function App() {
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [luckMessage, setLuckMessage] = useState('');

  const luckMessagesArray = [
    'Boa sorte!',
    'Muita prosperidade!',
    'Felicidade sem fim!',
    'Grandes realizações!',
    'Sucesso em tudo!',
    'Amor e alegria!',
    'Que seus sonhos se realizem!',
    'Tenha um dia incrível!',
    'Que a sorte esteja ao seu lado!',
    'Que a sorte sorria para você hoje e sempre.',
    "A sorte favorece os audazes!",
    "Você é uma pessoa de sorte!",
    "Sorte é o sorriso do destino!",
    'Que a sorte ilumine o seu caminho',
    'Acredite na sua sorte e ela virá'




  ];

  const generateRandomNumbers = () => {
    const newRandomNumbers = [];
    while (newRandomNumbers.length < 6) {
      const randomNumber = Math.floor(Math.random() * 60) + 1;
      if (!newRandomNumbers.includes(randomNumber)) {
        newRandomNumbers.push(randomNumber);
      }
    }

    newRandomNumbers.sort((a, b) => a - b);
    setRandomNumbers(newRandomNumbers);

   
    const randomIndex = Math.floor(Math.random() * luckMessagesArray.length);
    setLuckMessage(luckMessagesArray[randomIndex]);
  };

  const clearRandomNumbers = () => {
    setRandomNumbers([]);
    setLuckMessage('');
  };

  const copyToClipboard = () => {
    const numbersToCopy = randomNumbers.join(', ');
    navigator.clipboard.writeText(numbersToCopy)
      .then(() => {
        alert('Números copiados para a área de transferência: ' + numbersToCopy);
      })
      .catch((error) => {
        console.error('Erro ao copiar números: ', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
      <nav className="navbar">
          <span className="navbar-text">Jessi Lucky</span>
          <img
            src="https://img.freepik.com/icones-gratis/flor_318-353541.jpg"
            alt="Logo"
            className="navbar-image"
          />
        </nav>
        <div className="centered-content">
          {luckMessage && <h2 className="luck-message">{luckMessage}</h2>}
          <ul className="number-list">
            {randomNumbers.map((number, index) => (
              <li key={index} className="number-item">
                {number}
              </li>
            ))}
          </ul>
          <div className="button-container">
            <button className="custom-button" onClick={generateRandomNumbers}>
              Sortear números
            </button>
            <button className="custom-button" onClick={clearRandomNumbers}>
              Limpar
            </button>
            <button className="custom-button" onClick={copyToClipboard}>
              Copiar Números
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
