// Teste de API com POST: envia um corpo JSON autenticado, valida a resposta
// e registra uma métrica customizada de negócio.
import http from 'k6/http';
import { sleep, check } from 'k6';
import { Trend } from 'k6/metrics';

const BASE_URL = __ENV.BASE_URL || 'https://quickpizza.grafana.com';

// Métrica customizada: quantidade de ingredientes por pizza recomendada
const ingredientsPerPizza = new Trend('pizza_ingredients');

export const options = {
  vus: 5,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1000'],
    checks: ['rate>0.99'],
  },
};

export default function () {
  const payload = JSON.stringify({
    maxCaloriesPerSlice: 1000,
    mustBeVegetarian: false,
    excludedIngredients: [],
    excludedTools: [],
    maxNumberOfToppings: 5,
    minNumberOfToppings: 2,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      // O QuickPizza aceita qualquer token de 16 caracteres
      Authorization: 'token abcdef0123456789',
    },
  };

  const res = http.post(`${BASE_URL}/api/pizza`, payload, params);

  const ok = check(res, {
    'status é 200': (r) => r.status === 200,
    'pizza tem nome': (r) => r.json('pizza.name') !== undefined,
    'pizza tem massa': (r) => r.json('pizza.dough.name') !== undefined,
    'pizza tem ingredientes': (r) => r.json('pizza.ingredients').length > 0,
  });

  if (ok) {
    ingredientsPerPizza.add(res.json('pizza.ingredients').length);
  }

  sleep(1);
}
