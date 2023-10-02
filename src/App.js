import React, { useState } from 'react';
import './App.css';
import jsPDF from 'jspdf';

function App() {
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [luckMessage, setLuckMessage] = useState('');
  const createPDF = () => {
    const doc = new jsPDF();


    doc.setFillColor(75, 0, 130);


    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

    const titleText = 'Jessi Lucky - Sorteio de Números';
    const titleX = doc.internal.pageSize.width / 2;
    const titleY = 20;
    const imgX = titleX - 30;
    const imgY = titleY - 15;

    const imgData = 'https://img.freepik.com/icones-gratis/flor_318-353541.jpg';

    doc.setFontSize(16);
    doc.setTextColor('white');
    doc.text(titleText, titleX, titleY, { align: 'center' });
    doc.addImage(imgData, 'JPEG', imgX, imgY, 60, 30);


    const buttonText = 'Visite nosso site';
    const buttonX = titleX;
    const buttonY = doc.internal.pageSize.height - 30;

    doc.setTextColor('white');

    doc.text(buttonText, buttonX, buttonY, { align: 'center' });
    doc.setDrawColor('white');
    doc.rect(buttonX - 50, buttonY - 10, 100, 20);


    const siteURL = 'https://jessilucky.netlify.app';
    doc.setPage(1);
    doc.link(buttonX - 50, buttonY - 10, 100, 20, { url: siteURL });


    doc.setFontSize(12);
    doc.text('Números Sorteados:', 10, 60);
    doc.setDrawColor('white');

    randomNumbers.forEach((number, index) => {
      const x = 20 + index * 20;
      const y = 70;


      doc.setFillColor('green');
      doc.circle(x, y, 5, 'F');


      doc.setTextColor('white');
      doc.text(number.toString(), x - 2, y + 2);
    });

    const footerText = 'Jessi Software - © 2023';
    const footerX = doc.internal.pageSize.width / 2;
    const footerY = doc.internal.pageSize.height - 10;

    doc.setFontSize(10);
    doc.setTextColor('gray');
    doc.text(footerText, footerX, footerY, { align: 'center' });

    doc.save('numeros_sorteados.pdf');
  };

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
              Sortear Números
            </button>
            <button className="custom-button" onClick={clearRandomNumbers}>
              Limpar
            </button>
            <button className="custom-button" onClick={copyToClipboard}>
              Copiar Números
            </button>
            <button className="custom-button" onClick={createPDF}>
              Imprimir Números
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
