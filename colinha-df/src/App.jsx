import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import UrnaStep from './components/UrnaStep';
import ColinhaFinal from './components/ColinhaFinal';

const CARGOS_ORDEM = [
  { id: 'deputado_federal', titulo: 'Deputado Federal', digitos: 4 },
  { id: 'deputado_distrital', titulo: 'Deputado Distrital', digitos: 5 },
  { id: 'senador', titulo: 'Senador 1ª Vaga', digitos: 3 },
  { id: 'senador', titulo: 'Senador 2ª Vaga', digitos: 3 },
  { id: 'governador', titulo: 'Governador', digitos: 2 },
  { id: 'presidente', titulo: 'Presidente', digitos: 2 }
];

function App() {
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [votos, setVotos] = useState([]);
  
  // Estado para o Dark Mode (checa a preferência do sistema se quiser, mas inicia falso por padrão)
  const [darkMode, setDarkMode] = useState(false);

  const handleConfirmVote = (votoData) => {
    const novosVotos = [...votos, votoData];
    setVotos(novosVotos);
    setEtapaAtual(etapaAtual + 1);
  };

  const handleReset = () => {
    setVotos([]);
    setEtapaAtual(0);
  };

  const isFinished = etapaAtual >= CARGOS_ORDEM.length;

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
        
        {/* Cabeçalho Retangular Chamativo */}
        <header className="w-full bg-green-700 dark:bg-green-900 text-white shadow-md py-4 mb-8">
          <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
            <div className="text-left">
              <h1 className="text-3xl font-black uppercase tracking-tight m-0">Colinha DF</h1>
              <p className="text-green-100 font-semibold text-sm mt-1 hidden sm:block">Sua colinha para o dia da eleição</p>
            </div>
            
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-full bg-green-600 dark:bg-green-800 text-white hover:bg-green-500 dark:hover:bg-green-700 transition-colors duration-200 cursor-pointer shadow-sm"
              aria-label="Alternar modo claro e escuro"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </header>

        <main className="max-w-md mx-auto px-4 pb-8">
          {!isFinished ? (
            <div>
              <div className="mb-4 text-center">
                <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Passo {etapaAtual + 1} de {CARGOS_ORDEM.length}
                </span>
                <div className="w-full bg-gray-300 dark:bg-gray-700 h-2 mt-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-green-500 h-full transition-all duration-300"
                    style={{ width: `${((etapaAtual) / CARGOS_ORDEM.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <UrnaStep 
                key={etapaAtual}
              cargo={CARGOS_ORDEM[etapaAtual].titulo}
              idCargo={CARGOS_ORDEM[etapaAtual].id}
              numDigitos={CARGOS_ORDEM[etapaAtual].digitos}
              onConfirm={handleConfirmVote}
            />
          </div>
        ) : (
          <ColinhaFinal votos={votos} onReset={handleReset} />
        )}
        </main>

        <footer className="max-w-md mx-auto text-center mt-4 pb-8 px-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-500 p-3 rounded-lg mb-4 border border-yellow-200 dark:border-yellow-800">
            ⚠️ <strong>Aviso Importante:</strong> É estritamente proibido entrar na cabine de votação com o celular. Leve sua colinha <strong>anotada em papel</strong> ou impressa.
          </div>
          <p>
            Fonte dos dados: <a href="https://dadosabertos.tse.jus.br/" target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-500 hover:underline font-semibold">Portal de Dados Abertos do TSE</a>
          </p>
          <p className="mt-1 opacity-75">Este é um projeto independente e não possui vínculo com a Justiça Eleitoral.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
