import http from 'k6/http';
import { sleep, check } from 'k6';
// 1. Importa o gerador de relatório HTML comunitário (versão fixada para evitar mudanças inesperadas)
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/3.0.4/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.1.0/index.js';

export const options = {
  vus: 10,
  duration: '15s',
  // Critérios de aceite: se algum for violado, o k6 encerra com código de saída diferente de zero
  thresholds: {
    http_req_failed: ['rate<0.01'], // menos de 1% de requisições com erro
    http_req_duration: ['p(95)<500'], // 95% das requisições abaixo de 500ms
    checks: ['rate>0.99'], // mais de 99% dos checks aprovados
  },
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
