# Guia de Contribuição - Tokeniza.web3

Agradecemos o seu interesse em contribuir com o Tokeniza.web3! Este documento fornece diretrizes para contribuir com o projeto.

## Código de Conduta

Ao contribuir para este projeto, você concorda em respeitar nosso Código de Conduta. Esperamos que todos os colaboradores criem um ambiente positivo e acolhedor.

## Como Contribuir

### Reportando Bugs

Bugs são rastreados como issues no GitHub. Para reportar um bug:

1. Use um título claro e descritivo
2. Descreva os passos exatos para reproduzir o problema
3. Descreva o comportamento esperado e o que você observou
4. Inclua screenshots se possível
5. Especifique seu ambiente (navegador, OS, etc.)

### Sugestões de Recursos

Também aceitamos sugestões de recursos como issues no GitHub:

1. Use um título claro e descritivo
2. Forneça uma descrição detalhada do recurso proposto
3. Explique por que esse recurso seria útil para o projeto
4. Considere como ele pode ser implementado

### Pull Requests

1. Bifurque o repositório
2. Crie um branch para sua feature (`git checkout -b feature/minha-feature`)
3. Faça commit de suas mudanças (`git commit -am 'Adiciona minha feature'`)
4. Envie para o branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

### Padrões de Código

#### Frontend (Next.js/TypeScript)

- Use TypeScript para definição de tipos
- Siga o padrão de nomenclatura camelCase para variáveis/funções e PascalCase para componentes
- Documente componentes com JSDoc
- Escreva testes para novos componentes

#### Backend (Rust)

- Siga as convenções do Rust Style Guide
- Use nomes descritivos para funções e variáveis
- Documente funções públicas
- Adicione testes para novas funcionalidades

#### Smart Contracts (Solidity)

- Siga as melhores práticas de segurança da OpenZeppelin
- Documente funções e parâmetros com NatSpec
- Escreva testes para todas as funcionalidades
- Evite funções com alto custo de gás

### Estrutura do Projeto

Mantenha a estrutura de pastas existente:

```
tokenizacao-app/
├── app/             # Frontend Next.js
├── backend/         # Backend Rust/Axum
└── onchain/         # Smart Contracts Solidity/Foundry
```

## Processo de Desenvolvimento

1. Escolha um issue para trabalhar ou crie um novo
2. Discuta a abordagem no issue
3. Implemente sua solução
4. Escreva testes
5. Envie um Pull Request
6. Revise e incorpore feedback

## Revisão de Código

Todas as contribuições passarão por revisão. Os revisores podem sugerir mudanças para melhorar o código.

## Recursos Adicionais

- [Documentação do Next.js](https://nextjs.org/docs)
- [Livro do Rust](https://doc.rust-lang.org/book/)
- [Documentação do Solidity](https://docs.soliditylang.org/)
- [Guia da OpenZeppelin](https://docs.openzeppelin.com/contracts/)

---

Agradecemos por dedicar seu tempo para contribuir com o Tokeniza.web3!
