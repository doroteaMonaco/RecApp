import prismaConfig from "../config/prisma.js";
const { prisma } = prismaConfig;

export const createAccount = async (accountData) =>{
    const newAccount = await prisma.account.create({
        data: accountData
    });
    return newAccount;
}

export const findAccountById = async (id) => {
    return await prisma.account.findUnique({
        where: { id }
    });
}

export const findAccountByProvider = async (provider, providerAccountId) => {
    return await prisma.account.findUnique({
        where: {
            provider_providerAccountId: {
                provider,
                providerAccountId
            }
        }
    });
}

export const findAccountsByUserId = async (userId) => {
    return await prisma.account.findMany({
        where: { userId }
    });
}

export const updateAccount = async (id, updateData) => {
    return await prisma.account.update({
        where: { id },
        data: updateData
    });
}
export const deleteAccount = async (id) => {
    return await prisma.account.delete({
        where: { id }
    });
}

export const linkOAuthAccount = async (userId, provider, providerAccountId, accessToken, refreshToken) => {
    return await prisma.account.create({
        data: {
            userId,
            provider,
            providerAccountId,
            accessToken,
            refreshToken
        }
    });
}

export const linkOAuthAccountByEmail = async (accountData) => {
    const { userId, provider, providerAccountId, accessToken, refreshToken } = accountData;

    const newAccount = await prisma.account.create({
        data: {
            userId,
            type: 'oauth',
            provider,
            providerAccountId,
            access_token: accessToken,
            refresh_token: refreshToken || null
        }
    });
    return newAccount;
}