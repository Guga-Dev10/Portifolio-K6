// Spike test: pico repentino de usuários (ex.: início de uma promoção)
// para verificar se o sistema aguenta o choque e se recupera depois.
// Atenção: o QuickPizza público é compartilhado; os valores são propositalmente baixos.
import http from 'k6/http';
import { sleep, check } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://quickpizza.grafana.com';

export const options = {
  stages: [
    { duration: '10s', target: 5 }, // carga base
    { duration: '10s', target: 80 }, // pico repentino
    { duration: '30s', target: 80 }, // sustenta o pico
    { duration: '10s', target: 5 }, // queda brusca
    { duration: '20s', target: 5 }, // verifica a recuperação
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<2000'],
  },
};

export default function () {
  const res = http.get(`${BASE_URL}/`);
  check(res, {
    'status é 200': (r) => r.status === 200,
  });

  sleep(1);
}
