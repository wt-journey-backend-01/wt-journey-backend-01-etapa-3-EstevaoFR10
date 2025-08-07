<sup>Suas cotas de feedback AI acabaram, o sistema de feedback voltou ao padrão.</sup>

# 🧪 Relatório de Avaliação – Journey Levty Etapa 1 - EstevaoFR10

**Data:** 07/08/2025 00:45

**Nota Final:** `42.91/100`
**Status:** ❌ Reprovado

---
## ✅ Requisitos Obrigatórios
- Foram encontrados `16` problemas nos requisitos obrigatórios. Veja abaixo os testes que falharam:
  - ⚠️ **Falhou no teste**: `CREATE: Cria agentes corretamente`
    - **Melhoria sugerida**: A criação de agentes (`POST /agentes`) não está conforme o esperado. O teste esperava um status `201 Created` e os dados do agente no corpo da resposta. Verifique a lógica da sua rota para garantir que o agente é salvo e a resposta é formatada corretamente.
  - ⚠️ **Falhou no teste**: `READ: Lista todos os agente corretamente`
    - **Melhoria sugerida**: A listagem de agentes (`GET /agentes`) não está correta. O teste esperava um status `200 OK` e um array de agentes. Certifique-se de que sua rota está buscando e retornando todos os agentes de forma adequada.
  - ⚠️ **Falhou no teste**: `READ: Busca agente por ID corretamente`
    - **Melhoria sugerida**: A busca de agente por ID (`GET /agentes/:id`) falhou. O teste esperava um status `200 OK` e o objeto do agente correspondente ao ID. Verifique a lógica de busca e o tratamento de IDs na sua rota.
  - ⚠️ **Falhou no teste**: `UPDATE: Atualiza dados do agente com por completo (com PUT) corretamente`
    - **Melhoria sugerida**: A atualização completa de agentes (`PUT /agentes/:id`) não funcionou. O teste esperava um status `200 OK` e o agente com os dados atualizados. Verifique se sua rota está recebendo o payload completo e substituindo os dados existentes corretamente.
  - ⚠️ **Falhou no teste**: `UPDATE: Atualiza dados do agente com por completo (com PATCH) corretamente`
    - **Melhoria sugerida**: A atualização parcial de agentes (`PATCH /agentes/:id`) falhou. O teste esperava um status `200 OK` e o agente com os dados parcialmente atualizados. Verifique se sua rota está recebendo o payload parcial e aplicando as mudanças sem sobrescrever o objeto inteiro.
  - ⚠️ **Falhou no teste**: `DELETE: Deleta dados de agente corretamente`
    - **Melhoria sugerida**: A exclusão de agente (`DELETE /agentes/:id`) não funcionou como esperado. O teste esperava um status `204 No Content` e que o agente fosse realmente removido. Verifique a lógica de exclusão na sua rota.
  - ⚠️ **Falhou no teste**: `UPDATE: Recebe status code 404 ao tentar atualizar agente por completo com método PUT de agente inexistente`
    - **Melhoria sugerida**: Ao tentar atualizar um agente inexistente com `PUT /agentes/:id`, o teste não recebeu `404 Not Found`. A rota deve indicar que o recurso não foi encontrado.
  - ⚠️ **Falhou no teste**: `UPDATE: Recebe status code 404 ao tentar atualizar agente por parcialmente com método PATCH de agente inexistente`
    - **Melhoria sugerida**: Ao tentar atualizar um agente inexistente com `PATCH /agentes/:id`, o teste não recebeu `404 Not Found`. Certifique-se de que sua rota verifica a existência do recurso antes de tentar a atualização.
  - ⚠️ **Falhou no teste**: `CREATE: Cria casos corretamente`
    - **Melhoria sugerida**: A criação de casos (`POST /casos`) não está como o esperado. O teste esperava um status `201 Created` e os dados do caso no corpo da resposta. Revise a lógica da sua rota de criação de casos.
  - ⚠️ **Falhou no teste**: `Lista todos os casos corretamente`
    - **Melhoria sugerida**: A listagem de casos (`GET /casos`) não está correta. O teste esperava um status `200 OK` e um array de casos. Certifique-se de que sua rota está buscando e retornando todos os casos de forma adequada.
  - ⚠️ **Falhou no teste**: `READ: Busca caso por ID corretamente`
    - **Melhoria sugerida**: A busca de caso por ID (`GET /casos/:id`) falhou. O teste esperava um status `200 OK` e o objeto do caso correspondente ao ID. Verifique a lógica de busca e o tratamento de IDs na sua rota.
  - ⚠️ **Falhou no teste**: `UPDATE: Atualiza dados de um caso com por completo (com PUT) corretamente`
    - **Melhoria sugerida**: A atualização completa de casos (`PUT /casos/:id`) não funcionou. O teste esperava um status `200 OK` e o caso com os dados atualizados. Verifique se sua rota está recebendo o payload completo e substituindo os dados existentes corretamente.
  - ⚠️ **Falhou no teste**: `UPDATE: Atualiza dados de um caso parcialmente (com PATCH) corretamente`
    - **Melhoria sugerida**: A atualização parcial de casos (`PATCH /casos/:id`) falhou. O teste esperava um status `200 OK` e o caso com os dados parcialmente atualizados. Verifique se sua rota está recebendo o payload parcial e aplicando as mudanças sem sobrescrever o objeto inteiro.
  - ⚠️ **Falhou no teste**: `DELETE: Deleta dados de um caso corretamente`
    - **Melhoria sugerida**: A exclusão de caso (`DELETE /casos/:id`) não funcionou como esperado. O teste esperava um status `204 No Content` e que o caso fosse realmente removido. Verifique a lógica de exclusão na sua rota.
  - ⚠️ **Falhou no teste**: `READ: Recebe status code 404 ao tentar buscar um caso por ID inválido`
    - **Melhoria sugerida**: Ao tentar buscar um caso com ID inexistente (`GET /casos/:id`), o teste não recebeu `404 Not Found`. Sua rota deve ser capaz de identificar que o recurso não existe e retornar o status apropriado.
  - ⚠️ **Falhou no teste**: `UPDATE: Recebe status code 404 ao tentar atualizar um caso por completo com método PUT de um caso inexistente`
    - **Melhoria sugerida**: Ao tentar atualizar um caso inexistente com `PUT /casos/:id`, o teste não recebeu `404 Not Found`. A rota deve indicar que o recurso não foi encontrado.

## ⭐ Itens de Destaque (recupera até 40 pontos)
- Nenhum item bônus foi identificado. Tente adicionar mais estilo e complexidade ao seu código nas próximas tentativas!

## ❌ Problemas Detectados (Descontos de até 100 pontos)
- Nenhuma infração grave foi detectada. Muito bom nesse aspecto!

---
Continue praticando e caprichando no código. Cada detalhe conta! 💪
Se precisar de ajuda, não hesite em perguntar nos canais da guilda. Estamos aqui para ajudar! 🤝

---
<sup>Made By the Autograder Team.</sup><br>&nbsp;&nbsp;&nbsp;&nbsp;<sup><sup>- [Arthur Carvalho](https://github.com/ArthurCRodrigues)</sup></sup><br>&nbsp;&nbsp;&nbsp;&nbsp;<sup><sup>- [Arthur Drumond](https://github.com/drumondpucminas)</sup></sup><br>&nbsp;&nbsp;&nbsp;&nbsp;<sup><sup>- [Gabriel Resende](https://github.com/gnvr29)</sup></sup>