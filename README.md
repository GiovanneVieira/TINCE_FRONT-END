# TINCE Front-End

Este projeto adota oficialmente o modelo Delphi + Foundation Documentation para toda mudanca relevante.

## Setup

- Guia operacional original: https://www.notion.so/Como-compilar-o-Front-End-34d26f6052d080f7bfa3fc65b184f2e8

## Environment Variables

- `EXPO_PUBLIC_API_BASE_URL`: base URL da API consumida pelo app.
  - Exemplo local: `http://localhost:3000`
  - Exemplo hospedado: `https://nfc-api-w40n.onrender.com`
- `EXPO_PUBLIC_APP_ORIGIN`: origin enviado no fluxo de auth (`better-auth`/CORS).
  - Exemplo local: `http://localhost:8081`

## Regra de Execucao (Obrigatoria)

Antes de implementar qualquer mudanca relevante no app:

1. Abrir um TODO ativo em `belluga_now_foundation_documentation/todos/active/` usando `delphi-ai/templates/todo_template.md`.
2. Definir no TODO: `Scope`, `Out of Scope`, `Definition of Done`, `Validation Steps` e `Delivery Status Canon`.
3. Referenciar os docs canonicos aplicaveis (ex.: `project_mandate.md`, `domain_entities.md`, `persona_roadmaps.md`).
4. Executar implementacao somente apos o TODO estar aprovado.

## Regra de Fechamento (Obrigatoria)

Para considerar uma entrega concluida:

1. Atualizar o TODO com evidencias de validacao (testes, checks, fluxo manual).
2. Atualizar status do TODO conforme canon Delphi:
   - `Pending`
   - `Local-Implemented`
   - `Lane-Promoted`
   - `Production-Ready`
3. Registrar promocao/evidencia na secao `Promotion Evidence`.
4. Garantir alinhamento entre codigo e documentacao foundation.

## Principio Operacional

Codigo sem contrato de TODO e sem evidencia de validacao nao e considerado pronto.

## Guia Operacional Expo (TINCE)

Quando um TODO tatico do TINCE for aprovado, usar os artefatos Delphi abaixo:

1. Tela/componente:
   - `delphi-ai/workflows/expo/create-screen-method.md`
   - `delphi-ai/rules/expo/expo-screen-workflow-glob.md`
2. Rotas/navegacao:
   - `delphi-ai/workflows/expo/create-route-method.md`
   - `delphi-ai/rules/expo/expo-route-workflow-glob.md`
3. Estado e dados:
   - `delphi-ai/workflows/expo/create-state-and-query-method.md`
   - `delphi-ai/rules/expo/expo-state-query-workflow-glob.md`
4. Regra arquitetural geral:
   - `delphi-ai/rules/expo/expo-architecture-always-on.md`

## Checklist Minimo Por Entrega

1. Confirmar ownership correto:
   - `app/` para rotas/composicao
   - `components/` para UI reutilizavel
   - `queries/` para estado remoto
   - `stores/` para estado local
   - `lib/` para transporte/helpers
   - `types/` para contratos tipados
2. Executar validacao minima:
   - `npx tsc --noEmit`
   - `npm run dev`
   - smoke manual da rota/fluxo alterado (sucesso + erro/empty quando aplicavel)
3. Atualizar evidencias no TODO ativo antes de concluir a entrega.
