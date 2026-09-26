// Load test: simula a carga esperada em produção com rampa de subida, platô e descida.
import http from 'k6/http';
import { sleep, check } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://quickpizza.grafana.com';

export const options = {
  stages: [
    { duration: '30s', target: 20 }, // rampa de subida até 20 VUs
    { duration: '1m', target: 20 }, // mantém a carga esperada
    { duration: '30s', target: 0 }, // rampa de descida
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
    checks: ['rate>0.99'],
  },
};

export default function () {
  const res = http.get(`${BASE_URL}/api/names`);
  check(res, {
    'status é 200': (r) => r.status === 200,
  });

  sleep(1);
}
