import prisma from "../config/prisma";

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

export const findAccountByProvider = async (provider) => {
    return await prisma.account.findUnique({
        where: { provider }
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