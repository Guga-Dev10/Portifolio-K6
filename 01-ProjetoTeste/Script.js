import http from 'k6/http';
import { sleep, check } from 'k6';
// 1. Importa o gerador de relatório HTML comunitário
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export const options = {
  vus: 10,
  duration: '15s',
};

export default function () {
  const res = http.get('https://test.k6.io');
  
  check(res, {
    'status é 200': (r) => r.status === 200,
  });

  sleep(1); 
}

// 2. Função de callback que o k6 executa automaticamente ao encerrar o teste
export function handleSummary(data) {
  return {
    'summary.html': htmlReport(data), // Gera o relatório visual em HTML
    stdout: textSummary(data, { indent: ' ' }), // Mantém o sumário tradicional no terminal
  };
}