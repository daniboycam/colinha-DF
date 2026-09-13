import React, { useState, useEffect, useRef } from 'react';
import { Delete } from 'lucide-react';
import candidatosData from '../data/candidatos.json';

const UrnaStep = ({ cargo, numDigitos, idCargo, onConfirm, onCorrect }) => {
  const [numero, setNumero] = useState("");
  const [candidatoEncontrado, setCandidatoEncontrado] = useState(null);
  
  // Ref para focar no contêiner e permitir que o leitor de tela leia o contexto inicial
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, [cargo]);

  // Efeito para buscar o candidato quando o número estiver completo
  useEffect(() => {
    if (numero.length === numDigitos) {
      const listaCargo = candidatosData[idCargo] || [];
      const enc = listaCargo.find(c => c.numero === numero);
      if (enc) {
        setCandidatoEncontrado(enc);
      } else {
        setCandidatoEncontrado({
          numero: numero,
          nome: "VOTO NULO",
          partido: "",
          foto: "https://via.placeholder.com/150x200?text=Nulo"
        });
      }
    } else {
      setCandidatoEncontrado(null);
    }
  }, [numero, numDigitos, idCargo]);

  // Suporte a teclado físico (Acessibilidade Motora)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        handleKeyClick(e.key);
      } else if (e.key === 'Backspace') {
        setNumero(prev => prev.slice(0, -1));
      } else if (e.key === 'Enter') {
        handleConfirma();
      } else if (e.key.toLowerCase() === 'b') {
        handleBranco();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [numero, candidatoEncontrado]); // Atualiza dependências

  const handleKeyClick = (n) => {
    if (numero.length < numDigitos) {
      setNumero(prev => prev + n);
    }
  };

  const handleBranco = () => {
    onConfirm({
      cargo: cargo,
      numero: "BRANCO",
      nome: "VOTO EM BRANCO",
      partido: "",
      foto: null
    });
  };

  const handleCorrige = () => {
    setNumero(prev => prev.slice(0, -1));
  };

  const handleConfirma = () => {
    if (numero.length === numDigitos && candidatoEncontrado) {
      onConfirm({
        cargo: cargo,
        ...candidatoEncontrado
      });
    } else if (numero.length === 0) {
      alert("Digite o número ou vote em Branco.");
    } else {
      alert("Complete o número antes de confirmar.");
    }
  };

  const renderBoxes = () => {
    const boxes = [];
    for (let i = 0; i < numDigitos; i++) {
      boxes.push(
        <div 
          key={i} 
          className="w-10 h-14 border-2 border-gray-400 flex items-center justify-center text-2xl font-bold bg-white mx-1"
          aria-hidden="true"
        >
          {numero[i] || ""}
        </div>
      );
    }
    return boxes;
  };

  return (
    <div 
      className="flex flex-col items-center w-full max-w-md mx-auto bg-gray-200 dark:bg-gray-900 p-6 rounded-xl shadow-lg border-2 border-gray-300 dark:border-gray-800 transition-colors"
      ref={containerRef}
      tabIndex="-1"
      aria-label={`Tela de votação para ${cargo}. Digite ${numDigitos} números.`}
    >
      
      {/* Região ao vivo para Leitores de Tela (Acessibilidade Visual) */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {numero.length === 0 
          ? `Iniciando votação para ${cargo}. Pressione os números no teclado.`
          : `Número digitado: ${numero.split('').join(' ')}.`}
        {candidatoEncontrado && candidatoEncontrado.nome !== "VOTO NULO" && 
          ` Candidato encontrado: ${candidatoEncontrado.nome}, Partido ${candidatoEncontrado.partido}. Pressione Enter para confirmar.`}
        {candidatoEncontrado && candidatoEncontrado.nome === "VOTO NULO" && 
          ` Aviso: Voto Nulo.`}
      </div>

      {/* Tela da Urna */}
      <div className="w-full bg-white text-gray-900 border-4 border-gray-400 p-4 min-h-[250px] flex flex-col mb-6 relative">
        <h2 className="text-xl font-bold uppercase mb-2" aria-hidden="true">Seu Voto Para</h2>
        <h1 className="text-2xl font-black uppercase text-center mb-4" aria-hidden="true">{cargo}</h1>
        
        <div className="flex justify-center mb-6">
          {renderBoxes()}
        </div>

        {candidatoEncontrado && (
          <div className="flex flex-row justify-between mt-auto" aria-hidden="true">
            <div className="flex flex-col">
              <p className="font-bold text-lg">Nome: <span className="font-normal">{candidatoEncontrado.nome}</span></p>
              {candidatoEncontrado.partido && (
                <p className="font-bold text-lg">Partido: <span className="font-normal">{candidatoEncontrado.partido}</span></p>
              )}
            </div>
            {candidatoEncontrado.foto && (
              <img src={candidatoEncontrado.foto} alt="" className="w-24 h-32 object-cover border border-gray-300 ml-2" />
            )}
          </div>
        )}
      </div>

      {/* Teclado numérico */}
      <div className="bg-gray-800 p-4 rounded-lg w-full flex flex-col items-center" role="group" aria-label="Teclado numérico da urna">
        <div className="grid grid-cols-3 gap-3 mb-4 w-full px-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
            <button 
              key={n} 
              onClick={() => handleKeyClick(n.toString())}
              className="bg-gray-900 text-white font-bold text-xl py-3 rounded border border-gray-700 hover:bg-gray-800 active:bg-gray-600 shadow-md transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400 cursor-pointer"
              aria-label={`Número ${n}`}
            >
              {n}
            </button>
          ))}
          <div className="col-start-2">
            <button 
              onClick={() => handleKeyClick('0')}
              className="bg-gray-900 text-white font-bold text-xl py-3 w-full rounded border border-gray-700 hover:bg-gray-800 active:bg-gray-600 shadow-md transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400 cursor-pointer"
              aria-label="Número 0"
            >
              0
            </button>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="grid grid-cols-3 gap-2 w-full mt-2">
          <button 
            onClick={handleBranco} 
            className="bg-white text-black font-bold uppercase py-3 rounded text-sm hover:bg-gray-200 active:bg-gray-300 shadow-md transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400 cursor-pointer"
            aria-label="Votar em Branco. Atalho: tecla B"
          >
            Branco
          </button>
          <button 
            onClick={handleCorrige} 
            className="bg-orange-500 text-black font-bold uppercase py-3 rounded text-sm hover:bg-orange-400 active:bg-orange-600 shadow-md transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400 cursor-pointer"
            aria-label="Corrigir voto. Atalho: tecla Backspace"
          >
            Corrige
          </button>
          <button 
            onClick={handleConfirma} 
            className="bg-green-500 text-black font-bold uppercase py-3 rounded text-sm hover:bg-green-400 active:bg-green-600 shadow-md transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400 cursor-pointer"
            aria-label="Confirmar voto. Atalho: tecla Enter"
          >
            Confirma
          </button>
        </div>
      </div>
    </div>
  );
};

export default UrnaStep;
