import fs from 'fs';
import csv from 'csv-parser';
import iconv from 'iconv-lite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvFiles = [
  path.join(__dirname, '..', 'temp_csv_zip', 'consulta_cand_2026_DF.csv'),
  path.join(__dirname, '..', 'temp_csv_zip', 'consulta_cand_2026_BR.csv')
];

const outputFilePath = path.join(__dirname, '..', 'src', 'data', 'candidatos.json');

const mapaCargos = {
  'DEPUTADO FEDERAL': 'deputado_federal',
  'DEPUTADO DISTRITAL': 'deputado_distrital',
  'SENADOR': 'senador',
  'GOVERNADOR': 'governador',
  'PRESIDENTE': 'presidente'
};

const dadosOrganizados = {
  deputado_federal: [],
  deputado_distrital: [],
  senador: [],
  governador: [],
  presidente: []
};

console.log("⏳ Lendo arquivos CSV oficiais do TSE e convertendo dados...");

let filesProcessed = 0;

function finalize() {
  filesProcessed++;
  if (filesProcessed === csvFiles.length) {
    fs.writeFileSync(outputFilePath, JSON.stringify(dadosOrganizados, null, 2));
    console.log(`\n✅ SUCESSO! Banco de dados atualizado em: ${outputFilePath}`);
    console.log(`Total inserido:`);
    console.log(`- Presidentes: ${dadosOrganizados.presidente.length}`);
    console.log(`- Governadores: ${dadosOrganizados.governador.length}`);
    console.log(`- Senadores: ${dadosOrganizados.senador.length}`);
    console.log(`- Dep. Distritais: ${dadosOrganizados.deputado_distrital.length}`);
    console.log(`- Dep. Federais: ${dadosOrganizados.deputado_federal.length}\n`);
  }
}

csvFiles.forEach((file) => {
  if (!fs.existsSync(file)) {
    console.error(`\n❌ ERRO: O arquivo '${file}' não foi encontrado.`);
    finalize();
    return;
  }

  fs.createReadStream(file)
    .pipe(iconv.decodeStream('latin1')) 
    .pipe(csv({ separator: ';' }))
    .on('data', (row) => {
      // Ignorar inaptos se desejar, mas como vamos exibir tudo que der deferido
      if (row.DS_SITUACAO_CANDIDATURA && row.DS_SITUACAO_CANDIDATURA.includes('INAPTO')) return;

      const cargoTSE = row.DS_CARGO ? row.DS_CARGO.toUpperCase() : '';
      const cargoNoApp = mapaCargos[cargoTSE];

      if (cargoNoApp && (row.SG_UF === 'DF' || row.SG_UF === 'BR')) {
        const sequencial = row.SQ_CANDIDATO;
        
        // Link apontando para a foto local que copiamos
        const linkFoto = `/fotos/F${row.SG_UF}${sequencial}_div.jpg`;

        dadosOrganizados[cargoNoApp].push({
          numero: row.NR_CANDIDATO,
          nome: row.NM_URNA_CANDIDATO,
          partido: row.SG_PARTIDO,
          foto: linkFoto
        });
      }
    })
    .on('end', () => {
      finalize();
    });
});
