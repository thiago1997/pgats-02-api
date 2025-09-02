const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../app');

describe ('Transfer Controller', () => {
    describe ('POST /transfer', () => {
        it('Quando informo remetente e destinatario inexistentes recebo 400', async () => {
            const resposta = await request(app)
                .post('/transfer')
                .send({
                      from: "thiago1",
                      to: "thiago",
                      amount: 2000
                }); 
            expect(resposta.status).to.equal(400); 
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado')
        });
    });

    describe ('GET /transfers', () => {
 
    });
});