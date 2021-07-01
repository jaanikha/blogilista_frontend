describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Mies',
      username: 'TestiMies',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('TestiMies')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('Mies logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('TestiMies')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').contains('wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'TestiMies', password: 'salasana'
      }).then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.get('#addNewBlog-button').click()
      cy.get('#title').type('testiTitle')
      cy.get('#author').type('testiAuthor')
      cy.get('#url').type('testiUrl')
      cy.get('#submit-button').click()

      cy.get('.success').contains('blog was successfully added')
      cy.contains('testiTitle testiAuthor')
    })
  })

  describe('When logged in and a blog exists', function() {
    beforeEach(function() {
      cy.login({ username: 'TestiMies', password: 'salasana' })
      cy.createBlog({ title: 'testiTitle1', author: 'testiAuthor1', url: 'testiUrl1' })
      cy.createBlog({ title: 'testiTitle2', author: 'testiAuthor2', url: 'testiUrl2' })
    })

    it('A blog can be liked', function() {
      cy.contains('testiTitle2').contains('like').click()

      cy.contains('testiTitle2').contains('likes:1')
      cy.contains('testiTitle1').contains('likes:0')
    })

    it('A blog can be deleted by its creator', function() {
      cy.contains('testiTitle2').parent().parent().find('#delete_button').click()

      cy.get('html').should('not.contain', 'testiTitle2')
    })
  })
})


