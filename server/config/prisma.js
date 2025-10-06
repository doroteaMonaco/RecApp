import { PrismaClient } from '../../node_modules/@prisma/client/index.js';

const prisma = new PrismaClient();

const authConfig = {
    userSelect: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        createdAt: true,
        updatedAt: true
    }
};

export default { prisma, authConfig };