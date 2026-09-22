# Plano — Cidade Replica do TimeAutomático no Hermes Town

## Objetivo
Criar uma cidade exclusiva do TimeAutomático dentro do Hermes Town, com casas temáticas que agrupam os agentes atuais, decorações externas por tema, menu traduzido para português e agentes fixos permanentes — rodando em **porta própria e exclusiva** (não usar a 4187).

## Porta da nova cidade
- **Porta definitiva: 4190** (livre e separada da 4187).
- Serviço: `npm run serve:timeauto` → `http://127.0.0.1:4190/`.
- Nenhum compartilhamento de porta com a cidade padrão.

## Casas temáticas (grupos de agentes)
- Casa Banca de Saúde
- Casa DevSquad
- Casa Relacionamento
- Casa Carro
- Casa Celular
- Casa Moda
- Casa Perfumaria

## Decorações externas por casa
- Adicionar uma "banner" (ou outro `Prop`) sobre cada casa via `props.push({ kind: 'banner', x: ..., y: ..., blocks: [] })`, posicionada acima da varanda.
- A decoração deve lembrar o tema da casa (saúde, código, relacionamento, carro, celular, moda, perfumaria).

## Menu da UI em português
- Substituir textos em inglês em `src/main.ts`:
  - "Follow" → "Seguir"
  - "Director" → "Diretor"
  - "on/off" → "ligado/desligado"
  - Mensagens de status e tooltips para português.

## Residentes fixos
- Usar `scripts/generate-town-residents.mjs` para gerar `src/live/residents.json` a partir de **todos** os perfis em `~/.hermes/profiles/`.
- Cada residente deve ter o campo `home` apontando para a casa temática correspondente.
- A cidade não depende de sessões ao vivo: todos os ~114 agentes aparecem sempre.

## Servidor da réplica
- Copiar `server/serve-town.mjs` para `server/serve-timeauto.mjs`.
- Alterar a porta para **4190**.
- Atualizar `package.json`:
  ```json
  "scripts": {
    "serve:timeauto": "node server/serve-timeauto.mjs"
  }
  ```

## Build e execução
1. `npm install`
2. `npm run build`
3. `npm run serve:timeauto`
4. Verificar HTTP 200 em `http://127.0.0.1:4190/`.

## Validação
- Casas com nomes temáticos visíveis.
- Todos os agentes (~114) como residentes fixos nas casas corretas.
- Decorações externas visíveis.
- Menu 100% em português.
- Nada compartilhando porta com a cidade padrão.

## Fork e versionamento
- Repositório: `igorferreira/hermes-town` (fork da conta do Igor).
- Branch: `timeautomatico-replica`.
- Commits feitos **somente no fork** — nunca no repositório original.
- Push: `git push origin timeautomatico-replica`.

## Controle
- Kanban: tarefa `t_5c2b8691` (criar cidade réplica do TimeAutomático).
- Registro de início/fim em `~/clawd/PEDIDOS.md`.

## Estimativa
- ~1h30 de execução.
- Impacto: cidade permanente em `http://127.0.0.1:4190/`.