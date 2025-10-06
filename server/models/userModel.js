import prismaConfig from "../config/prisma.js";
const { prisma } = prismaConfig;
import bcrypt from "bcryptjs";

export const createUser = async (userData) => {
    const { email, password, name, avatar } = userData;

    let hashedPassword = null;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }

    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            image: avatar || null,
        }
    });
    return newUser;
}

export const findUserByEmail = async (email) => {
    if (!email) {
        return null;
    }
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