# Portfólio de Engenharia de Testes: Testes de Carga com k6

Este repositório faz parte de uma trilha prática de evolução profissional em Quality Assurance e Automação de Testes, focada em arquiteturas de alta performance e engenharia de confiabilidade de software.

## 🚀 Sobre o Projeto
O objetivo deste projeto é explorar, na prática, os conceitos de testes de carga, estresse e resiliência utilizando o **k6** (da Grafana Labs). A abordagem segue os princípios de engenharia de software robusta, versionamento com Git/GitHub e análise métrica refinada.

## 📁 Estrutura do Repositório
```text
Portfolio-K6/
│
├── 01-ProjetoTeste/   # Introdução: HTTP GET, checks, thresholds e relatório HTML
├── 02-SmokeTest/      # Carga mínima para validar o sistema e o script
├── 03-LoadTest/       # Carga esperada com rampa de subida, platô e descida
├── 04-StressTest/     # Carga crescente em degraus para encontrar o ponto de degradação
├── 05-SpikeTest/      # Pico repentino de usuários e recuperação
├── 06-ApiPost/        # POST autenticado com JSON e métrica customizada
├── .gitignore         # Arquivos ignorados pelo controle de versão
└── README.md          # Documentação principal do projeto
```

## ▶️ Como executar
Com o [k6 instalado](https://grafana.com/docs/k6/latest/set-up/install-k6/), rode a partir da raiz:

```bash
k6 run 02-SmokeTest/smoke-test.js
```

Os scripts 02 a 06 usam o [QuickPizza](https://quickpizza.grafana.com), aplicação de demonstração da Grafana. Para apontar para outro ambiente (ex.: uma instância local), use `BASE_URL`:

```bash
k6 run -e BASE_URL=http://localhost:3333 04-StressTest/stress-test.js
```
