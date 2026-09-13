import * as htmlToImage from 'html-to-image';

export const exportAsImage = async (element, imageFileName) => {
  if (!element) return;
  
  try {
    const dataUrl = await htmlToImage.toPng(element, {
      quality: 1.0,
      backgroundColor: '#ffffff',
      pixelRatio: 2
    });
    
    downloadImage(dataUrl, imageFileName);
  } catch (error) {
    console.error("Erro ao gerar a imagem:", error);
    alert("Ocorreu um erro ao gerar a colinha. Tente novamente.");
  }
};

export const exportAndShareImage = async (element, imageFileName) => {
  if (!element) return;
  
  try {
    const dataUrl = await htmlToImage.toPng(element, {
      quality: 1.0,
      backgroundColor: '#ffffff',
      pixelRatio: 2
    });
    
    // Converter DataURL para Blob para compartilhamento
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const file = new File([blob], imageFileName, { type: 'image/png' });

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: 'Minha Colinha DF',
        text: 'Aqui está minha colinha pronta para o dia da eleição!',
        files: [file]
      });
    } else {
      // Fallback para download se o navegador/dispositivo não suportar
      alert("O compartilhamento direto não é suportado pelo seu navegador. A imagem será baixada no seu aparelho.");
      downloadImage(dataUrl, imageFileName);
    }
  } catch (error) {
    if (error.name !== 'AbortError') { // Ignora se o usuário cancelou o compartilhamento
      console.error("Erro ao compartilhar a imagem:", error);
      alert("Ocorreu um erro ao compartilhar a colinha.");
    }
  }
};

const downloadImage = (dataUrl, fileName) => {
  const fakeLink = window.document.createElement('a');
  fakeLink.style = 'display:none;';
  fakeLink.download = fileName;
  
  fakeLink.href = dataUrl;
  
  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);
  
  fakeLink.remove();
};
