# Demonstração do Bug Tracker Pro

![Dashboard com três problemas fictícios, duas severidades High ou Critical e controles de cadastro e exclusão](images/dashboard.jpg)

Captura da aplicação executada localmente em **15/10/2026**, com dados fictícios. O painel apresenta três registros e contabiliza dois itens de severidade `High` ou `Critical`.

## Verificações realizadas

| Verificação | Resultado |
| --- | --- |
| Build do frontend com `npm run build` | Concluído |
| Cadastro pela interface | Registros exibidos na tabela após envio do formulário |
| Indicadores de quantidade e severidade | Três registros; dois itens `High` ou `Critical` |
| Exclusão de um registro temporário | Registro removido; três itens mantidos na listagem |
| Recarregamento da página | Os três registros voltaram a ser apresentados |

A captura representa uma execução local. O indicador `System Status` é um texto fixo da interface, sem uma verificação de saúde do backend.

Ambiente da verificação: Python 3.12.14, Node.js 24.21.0 e dependências instaladas pelos arquivos do projeto. O build utilizou o lockfile do frontend.

[Executar localmente](../README.md#execução-local) · [Rotas da API](../README.md#api) · [Código](../)
