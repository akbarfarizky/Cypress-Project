describe('API Automation Testing - Reqres.in', () => {
    const baseUrl = 'https://reqres.in/api';
    const headers = {
        'x-api-key': 'reqres-free-v1'
    };
    const start = Date.now()

    it('GET - List Users', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/users?page=2`,
            headers
        }).then((response) => {
            expect(response.status).to.eq(200)
        }) 
    })


    it('GET - Single User',() => {
        cy.request({
            method:'GET',
            url: `${baseUrl}/users/2`,
            headers
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data).to.have.property('id',2)
        })
    })

    it('GET - Single User Not Found',() => {
        cy.request({
            method:'GET',
            url: `${baseUrl}/users/99`,
            failOnStatusCode: false,
            headers
        }).then((response) => {
            expect(response.status).to.eq(404)
        })
    })

    it('GET - List <RESOURCE>',() => {
        cy.request({
            method:'GET',
            url: `${baseUrl}/unknown`,
            headers
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('GET - Single <RESOURCE>',() => {
        cy.request({
            method:'GET',
            url: `${baseUrl}/unknown/2`,
            headers
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data).to.have.property('id',2)
        })
    })

    it('GET - Single < RESOURCE> User Not Found',() => {
        cy.request({
            method:'GET',
            url: `${baseUrl}/unknown/23`,
            failOnStatusCode: false,
            headers
        }).then((response) => {
            expect(response.status).to.eq(404)
        })
    })

    it('POST - Create User', () => {
        cy.request({
            method:'POST',
            url: `${baseUrl}/users`,
            headers,
            body:{
                name: 'Akbar',
                job: 'QA'
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('name', 'Akbar')
            expect(response.body).to.have.property('job', 'QA')
        })
    })
    
    it('PUT - Update User', () => {
        cy.request({
            method:'PUT',
            url: `${baseUrl}/users/2`,
            headers,
            body:{
                name: 'Ahmad',
                job: 'Programmer'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', 'Ahmad')
            expect(response.body).to.have.property('job', 'Programmer')
        })
    })
    
    it('DELETE - Delete User', () => {
        cy.request({
            method:'DELETE',
            url: `${baseUrl}/users/2`,
            headers
        }).then((response) => {
            expect(response.status).to.eq(204);
        })
    })

    it('POST - Register User Berhasil', () => {
        cy.request({
            method:'POST',
            url: `${baseUrl}/register`,
            headers,
            body:{
                "email": "eve.holt@reqres.in",
                "password": "pistol"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id',4)
        })
    })

    it('POST - Register User Gagal', () => {
        cy.request({
            method:'POST',
            url: `${baseUrl}/register`,
            failOnStatusCode: false,
            headers,
            body:{
                 "email": "sydney@fife"
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('error','Missing password')
        })
    })

    it('POST - Login Berhasil', () => {
        cy.request({
            method:'POST',
            url: `${baseUrl}/login`,
            headers,
            body:{
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('token')
        })
    })

    it('POST - Login Gagal', () => {
        cy.request({
            method:'POST',
            url: `${baseUrl}/login`,
            failOnStatusCode: false,
            headers,
            body:{
                "email": "peter@klaven"
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('error','Missing password')
        })
    })

    it.only('GET - Waktu Respon Delay', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/users?delay=3`,
            headers,
        }).then((response) => {
            const duration = Date.now() - start;
            expect(response.status).to.eq(200);
            expect(duration).to.be.gte(3000); // minimal 3 detik
            expect(duration).to.be.lt(6000);  // maksimal 6 detik (safety)
        })
    })

})
