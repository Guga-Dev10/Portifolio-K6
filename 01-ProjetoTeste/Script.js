import http from 'k6/http';
import { sleep, check } from 'k6';

// 1. CONFIGURAÇÃO (Options): Define "quantos caminhões" e "por quanto tempo"
export const options = {
  vus: 10,           // Virtual Users (Usuários Simultâneos)
  duration: '15s',   // Duração total do teste
};

// 2. EXECUÇÃO (Default Function): O que cada usuário vai fazer repetidamente
export default function () {
  // Fazemos uma requisição GET para um site de testes próprio do k6
  const res = http.get('https://test.k6.io');
  
  // Verificamos se a resposta foi 200 (OK)
  check(res, {
    'status é 200': (r) => r.status === 200,
  });

  // Pausa de 1 segundo entre as requisições para simular um humano lendo a página
  sleep(1); 
}