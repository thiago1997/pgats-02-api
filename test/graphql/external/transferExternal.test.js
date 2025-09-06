const request = require('supertest');
const { expect, use } = require('chai');
const chaiExclude = require('chai-exclude');
use(chaiExclude);

require('dotenv').config();

describe('Teste de Transferencia', () => {

    beforeEach(async () => {
        const loginUser = require('../fixture/requisicoes/login/loginUser.json')
        const resposta = await request (process.env.BASE_URL_GRAPHQL)
            .post('/')
            .send (loginUser);    
             
        token = resposta.body.data.loginUser.token;
    });

    it('Validar que é possível transferir grana entre duas contas', async () => {
        const respostaEsperada = require ('../fixture/requisicoes/respostas/transferencia/validarQueEPossivelTransferirGranaEntreDuasContas.json')

        const createTransfer = require('../fixture/requisicoes/transferencia/createTransfer.json')
        const respostaTransferencia = await request(process.env.BASE_URL_GRAPHQL)
            .post('/')
            .set('Authorization', `Bearer ${token}`)
            .send(createTransfer);

        expect(respostaTransferencia.status).to.equal(200);
        //expect(respostaEsperada.body).to.eql(respostaEsperada);
        expect(respostaTransferencia.body.data.createTransfer)
            .excluding('date')
            .to.deep.equal(respostaEsperada.data.createTransfer);

    });

    it('Validar que não é possível transferir valor acima do saldo', async () => {
        const createTransfer = require('../fixture/requisicoes/transferencia/createTransfer.json')
        createTransfer.variables.value = 15500.01;
        const respostaTransferencia = await request(process.env.BASE_URL_GRAPHQL)
            .post('/')
            .set('Authorization', `Bearer ${token}`)
            .send(createTransfer);

        expect(respostaTransferencia.body.errors[0].message).to.equal('Saldo insuficiente');
    });
} );