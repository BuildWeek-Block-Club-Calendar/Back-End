const request = require('supertest')

const server = require('../server')

describe('server', () => {
    describe('guest route GET', () => {
        it('should return an OK status code from the GET route', async () => {
            const expectedStatusCode = 200
            
            const response = await request(server).get('/api/guest')

            expect(response.status).toEqual(expectedStatusCode)
        })
        it('should return a JSON object from the GET route', async() => {
            const response = await request(server).get('/api/guest')

            expect(response.type).toEqual('application/json')
        })
    })
})