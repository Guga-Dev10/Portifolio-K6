// Stress test: aumenta a carga em degraus além do esperado para descobrir
// a partir de qual ponto o sistema começa a degradar.
// Atenção: o QuickPizza público é compartilhado; os valores são propositalmente baixos.
// Para testar limites de verdade, aponte BASE_URL para uma instância local (docker run -p 3333:3333 ghcr.io/grafana/quickpizza-local).
import http from 'k6/http';
import { sleep, check } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://quickpizza.grafana.com';

export const options = {
  stages: [
    { duration: '30s', target: 20 }, // carga normal
    { duration: '30s', target: 40 }, // acima do normal
    { duration: '30s', target: 60 }, // próximo do limite
    { duration: '30s', target: 60 },
    { duration: '30s', target: 0 }, // recuperação
  ],
  thresholds: {
    // limites mais tolerantes: o objetivo é observar a degradação, não bloquear
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<1500'],
  },
};

export default function () {
  const res = http.get(`${BASE_URL}/api/names`);
  check(res, {
    'status é 200': (r) => r.status === 200,
  });

  sleep(1);
}
