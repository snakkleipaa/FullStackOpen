describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Henna Pääkkö',
            username: 'hpaakko',
            password: 'salasana'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('Log in to application')
        cy.get('.loginForm')
            .should('contain', 'username')
            .and('contain', 'password')
    })

    describe('Login',function() {

        it('succeeds with correct credentials', function() {
            cy.get('#username').type('hpaakko')
            cy.get('#password').type('salasana')
            cy.get('#login-button').click()

            cy.contains('Henna Pääkkö logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('hpaakko')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.get('.error').contains('wrong username or password')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'hpaakko', password: 'salasana' })
        })

        it('a blog can be created', function() {
            cy.contains('new blog').click()
            cy.contains('add new blog')

            cy.get('#title').type('A New Blog')
            cy.get('#author').type('Cypress')
            cy.get('#url').type('www.added.url')

            cy.contains('create').click()

            cy.contains('A New Blog by Cypress')
        })
        describe('and when the blog exists', function() {
            beforeEach(function () {
                cy.createBlog({
                    title: 'Another Blog',
                    author: 'Cypress',
                    url: 'www.justanother.url'
                })
            })

            it('a blog can be liked', function() {
                cy.contains('view').click()
                cy.contains('like').click()

                cy.contains('likes: 1')
            })

            it('creator of the blog can delete it', function() {
                cy.contains('view').click()
                cy.contains('remove').click()

                cy.get('html').should('not.contain', 'Another Blog by Cypress')
            })

            it('blogs are ordered by number of likes', function() {
                cy.createBlog({
                    title: 'Second Blog',
                    author: 'Cypress',
                    url: 'www.second.url',
                    likes: 10
                })
                cy.createBlog({
                    title: 'Most likes',
                    author: 'Cypress',
                    url: 'www.mostlikes.url',
                    likes: 100
                })

                cy.get('.blog').eq(0).contains('Most likes by Cypress').should('exist')
                cy.get('.blog').eq(1).contains('Second Blog by Cypress').should('exist')
                cy.get('.blog').eq(2).contains('Another Blog by Cypress').should('exist')
            })
        })
    })
})