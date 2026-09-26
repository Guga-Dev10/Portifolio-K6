// Smoke test: carga mínima para validar que o sistema responde e o script está correto
// antes de rodar testes mais pesados.
import http from 'k6/http';
import { sleep, check, group } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://quickpizza.grafana.com';

export const options = {
  vus: 1,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate==0'], // no smoke test nenhum erro é aceitável
    http_req_duration: ['p(95)<800'],
    checks: ['rate==1'],
  },
};

export default function () {
  group('Página inicial', () => {
    const res = http.get(`${BASE_URL}/`);
    check(res, {
      'status é 200': (r) => r.status === 200,
      'retorna HTML': (r) => r.headers['Content-Type'].includes('text/html'),
    });
  });

  group('API de nomes', () => {
    const res = http.get(`${BASE_URL}/api/names`);
    check(res, {
      'status é 200': (r) => r.status === 200,
      'lista de nomes não está vazia': (r) => r.json('names').length > 0,
    });
  });

  sleep(1);
}
