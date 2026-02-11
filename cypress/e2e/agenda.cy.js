/// <reference types="cypress" />

describe('Testes para a agenda de contatos', () => {
    // Definimos a URL base ou visitamos o link antes de cada teste
    beforeEach(() => {
        cy.visit('https://ebac-agenda-contatos-tan.vercel.app/')
    })

    it('Deve incluir um novo contato na lista', () => {
        // Preenche os campos de input
        cy.get('input[type="text"]').type('Gemini Aluno EBAC')
        cy.get('input[type="email"]').type('gemini@ebac.com.br')
        cy.get('input[type="tel"]').type('11999999999')
        
        // Clica no botão de adicionar
        cy.get('.adicionar').click()

        // Validação: Verifica se o novo contato aparece na lista
        cy.contains('Gemini Aluno EBAC').should('be.visible')
        cy.contains('gemini@ebac.com.br').should('be.visible')
    })

    it('Deve alterar os dados de um contato existente', () => {
        // Clica no primeiro botão de editar disponível
        cy.get('.edit').first().click()

        // Limpa o campo de nome e digita o novo nome
        cy.get('input[type="text"]').clear().type('Contato Alterado')
        cy.get('input[type="email"]').clear().type('alterado@ebac.com.br')
        
        // Salva a alteração (o botão de adicionar vira o de salvar/confirmar)
        cy.get('.alterar').click()

        // Validação: Verifica se os dados alterados persistem na tela
        cy.contains('Contato Alterado').should('be.visible')
        cy.contains('alterado@ebac.com.br').should('be.visible')
    })

    it('Deve remover um contato da lista', () => {
        // Capturamos o nome do primeiro contato para verificar sua ausência depois
        cy.get('li h3').first().invoke('text').then((nomeAntes) => {
            
            // Clica no botão de deletar do primeiro contato
            cy.get('.delete').first().click()

            // Validação: O nome capturado não deve mais existir no documento
            cy.contains(nomeAntes).should('not.exist')
        })
    })
})
