import React, { useRef } from 'react';
import { exportAsImage, exportAndShareImage } from '../utils/exportImage';
import { RefreshCw, Download, Share2 } from 'lucide-react';

const ColinhaFinal = ({ votos, onReset }) => {
  const colinhaRef = useRef(null);

  const handleExport = () => {
    exportAsImage(colinhaRef.current, 'minha-colinha-df.png');
  };

  const handleShare = () => {
    exportAndShareImage(colinhaRef.current, 'minha-colinha-df.png');
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-4">
      
      {/* Elemento que será transformado em imagem */}
      <div 
        ref={colinhaRef} 
        className="w-full bg-white dark:bg-black text-gray-900 dark:text-gray-100 p-6 rounded shadow-lg border border-gray-200 dark:border-gray-700 dark:border-gray-800 mb-6"
        style={{ minHeight: '600px' }}
      >
        <div className="text-center mb-6 border-b-2 border-gray-800 dark:border-gray-100 pb-2">
          <h1 className="text-2xl font-black uppercase text-gray-900 dark:text-gray-100">Colinha DF</h1>
          <p className="text-gray-600 dark:text-gray-400 font-bold uppercase">Eleições Distrito Federal</p>
        </div>

        <div className="flex flex-col gap-4">
          {votos.map((voto, index) => (
            <div key={index} className="flex flex-row items-center border-b border-gray-300 dark:border-gray-700 pb-3">
              {voto.foto && voto.numero !== "BRANCO" ? (
                <img src={voto.foto} alt="Candidato" crossOrigin="anonymous" className="w-16 h-20 object-cover rounded shadow border border-gray-200 dark:border-gray-700" />
              ) : (
                <div className="w-16 h-20 bg-gray-200 dark:bg-gray-800 flex items-center justify-center rounded shadow border border-gray-300 dark:border-gray-700">
                  <span className="text-xs text-gray-500 dark:text-gray-400 text-center">Sem<br/>Foto</span>
                </div>
              )}
              
              <div className="ml-4 flex flex-col flex-1">
                <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase">{voto.cargo}</span>
                <span className="text-lg font-black text-gray-900 dark:text-gray-100">{voto.numero}</span>
                <span className="text-md font-bold text-gray-800 dark:text-gray-200">{voto.nome}</span>
                {voto.partido && (
                  <span className="text-sm text-gray-600 dark:text-gray-400">{voto.partido}</span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400 font-semibold">
          <p>⚠️ É proibido o uso de celular na cabine.</p>
          <p>Leve esta colinha anotada ou impressa.</p>
          <p className="mt-2 text-[10px]">Gerado no app Colinha DF</p>
        </div>
      </div>

      <div className="grid grid-cols-3 w-full gap-2 sm:gap-4">
        <button 
          onClick={onReset}
          className="flex flex-col items-center justify-center bg-gray-600 text-white font-bold py-3 px-2 rounded shadow hover:bg-gray-700 transition-colors duration-200 cursor-pointer text-xs sm:text-sm"
        >
          <RefreshCw size={20} className="mb-1" />
          Refazer
        </button>
        <button 
          onClick={handleExport}
          className="flex flex-col items-center justify-center bg-green-600 text-white font-bold py-3 px-2 rounded shadow hover:bg-green-700 transition-colors duration-200 cursor-pointer text-xs sm:text-sm"
        >
          <Download size={20} className="mb-1" />
          Baixar
        </button>
        <button 
          onClick={handleShare}
          className="flex flex-col items-center justify-center bg-blue-600 text-white font-bold py-3 px-2 rounded shadow hover:bg-blue-700 transition-colors duration-200 cursor-pointer text-xs sm:text-sm"
        >
          <Share2 size={20} className="mb-1" />
          Compartilhar
        </button>
      </div>

    </div>
  );
};

export default ColinhaFinal;
