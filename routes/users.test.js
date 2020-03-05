const request = require('supertest')

const server = require('../server')

describe('server', () => {
    describe('register route', () => {
        it('should return 201 AND JSON', async () => {
            const expectedStatusCode = 201

            const response = await request(server)
            .post('/api/users/register')
            .send({
                email: 'test@test.com',
                username: 'test',
                password: 'test'
            })

            expect(response.status).toEqual(expectedStatusCode)

            expect(response.type).toEqual('application/json')
        })
    })
})