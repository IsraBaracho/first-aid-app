import request from 'supertest';
import app from '../../app';
import prisma from '../../config/database';

    describe('Emergencies API Integration Tests', () => {
    
    // Limpa banco antes de cada teste
    beforeEach(async () => {
        await prisma.step.deleteMany();
        await prisma.emergency.deleteMany();
    });

    // Fecha conexão após todos os testes
    afterAll(async () => {
        await prisma.$disconnect();
    });

    describe('GET /api/emergencies', () => {
        test('deve retornar array vazio inicialmente', async () => {
        const response = await request(app).get('/api/emergencies');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
        });

        test('deve retornar emergências cadastradas', async () => {
        // Criar emergência via API
        await request(app)
            .post('/api/emergencies')
            .send({
            title: 'Queimadura',
            steps: [{ title: 'Passo 1', description: 'Desc 1' }],
            });

        // Buscar todas
        const response = await request(app).get('/api/emergencies');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].title).toBe('Queimadura');
        });
    });

    describe('POST /api/emergencies', () => {
        test('deve criar emergência com dados válidos', async () => {
        const newEmergency = {
            title: 'Queimadura de Primeiro Grau',
            steps: [
            { title: 'Resfrie', description: 'Use água fria' },
            { title: 'Cubra', description: 'Use pano limpo' },
            ],
            tags: ['queimadura', 'urgente'],
            description: 'Procedimento para queimaduras leves',
        };

        const response = await request(app)
            .post('/api/emergencies')
            .send(newEmergency);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('slug');
        expect(response.body.title).toBe(newEmergency.title);
        expect(response.body.steps).toHaveLength(2);
        expect(response.body.tags).toEqual(newEmergency.tags);
        });

        test('deve retornar 400 se title estiver faltando', async () => {
        const response = await request(app)
            .post('/api/emergencies')
            .send({
            steps: [{ title: 'Passo 1', description: 'Desc 1' }],
            });

        expect(response.status).toBe(400);
        });

        test('deve retornar 400 se steps estiver faltando', async () => {
        const response = await request(app)
            .post('/api/emergencies')
            .send({
            title: 'Queimadura',
            });

        expect(response.status).toBe(400);
        });
    });

    describe('GET /api/emergencies/:id', () => {
        test('deve retornar emergência por ID', async () => {
        // Criar emergência
        const created = await request(app)
            .post('/api/emergencies')
            .send({
            title: 'Queimadura',
            steps: [{ title: 'Passo 1', description: 'Desc 1' }],
            });

        const id = created.body.id;

        // Buscar por ID
        const response = await request(app).get(`/api/emergencies/${id}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(id);
        expect(response.body.title).toBe('Queimadura');
        });

        test('deve retornar emergência por slug', async () => {
        // Criar emergência
        await request(app)
            .post('/api/emergencies')
            .send({
            title: 'Queimadura',
            steps: [{ title: 'Passo 1', description: 'Desc 1' }],
            });

        // Buscar por slug
        const response = await request(app).get('/api/emergencies/queimadura');

        expect(response.status).toBe(200);
        expect(response.body.slug).toBe('queimadura');
        });

        test('deve retornar 404 se ID não existir', async () => {
        const response = await request(app).get('/api/emergencies/id-inexistente');

        expect(response.status).toBe(404);
        });
    });

    describe('PUT /api/emergencies/:id', () => {
        test('deve atualizar emergência existente', async () => {
        // Criar emergência
        const created = await request(app)
            .post('/api/emergencies')
            .send({
            title: 'Queimadura',
            steps: [{ title: 'Passo 1', description: 'Desc 1' }],
            });

        const id = created.body.id;

        // Atualizar
        const response = await request(app)
            .put(`/api/emergencies/${id}`)
            .send({
            title: 'Queimadura Grave',
            description: 'Descrição atualizada',
            });

        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Queimadura Grave');
        expect(response.body.description).toBe('Descrição atualizada');
        expect(response.body.slug).toBe('queimadura-grave');
        });

        test('deve retornar 404 se ID não existir', async () => {
        const response = await request(app)
            .put('/api/emergencies/id-inexistente')
            .send({ title: 'Teste' });

        expect(response.status).toBe(404);
        });
    });

    describe('DELETE /api/emergencies/:id', () => {
        test('deve deletar emergência existente', async () => {
        // Criar emergência
        const created = await request(app)
            .post('/api/emergencies')
            .send({
            title: 'Queimadura',
            steps: [{ title: 'Passo 1', description: 'Desc 1' }],
            });

        const id = created.body.id;

        // Deletar
        const response = await request(app).delete(`/api/emergencies/${id}`);

        expect(response.status).toBe(200);
        expect(response.body.deleted.id).toBe(id);

        // Verificar se foi deletada
        const checkDeleted = await request(app).get(`/api/emergencies/${id}`);
        expect(checkDeleted.status).toBe(404);
        });

        test('deve retornar 404 se ID não existir', async () => {
        const response = await request(app).delete('/api/emergencies/id-inexistente');

        expect(response.status).toBe(404);
        });
    });
    });