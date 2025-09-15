import prisma from "../config/prisma";
import bcrypt from "bcrypt";

export const createUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        }
    });
    return newUser;
}

export const findUserByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: { email }
    });
}

export const findUserById = async (id) => {
    return await prisma.user.findUnique({
        where: { id }
    });
}

export const updateUser = async (id, updateData) => {
    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    return await prisma.user.update({
        where: { id },
        data: updateData
    });
}

export const deleteUser = async (id) => {
    return await prisma.user.delete({
        where: { id }
    });
}