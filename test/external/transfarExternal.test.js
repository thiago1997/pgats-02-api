const request = require('supertest');
const { expect } = require ('chai');

describe ('Trasnfer', ()=> {
    describe ('POST /transfers', () => {
        it('Quando informo remetente e destinatario inexistentes recebo 400', async () => {
            const resposta = (await request('http://localhost:3000')
                .post('/transfers'))
                .send({
                    from: "thiago",
                    to: "thiago1",
                    value: 2000
                });
        });
    });
});