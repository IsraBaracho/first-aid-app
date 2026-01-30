import prisma from './config/database';

// Fecha conexão do Prisma após todos os testes
afterAll(async () => {
    await prisma.$disconnect();
});