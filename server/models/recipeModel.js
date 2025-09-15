import prisma from "../config/prisma";

export const createRecipe = async (recipedata) => {
    return await prisma.recipe.create({
        data: recipedata
    });
}

export const findRecipeById = async (id) => {
    return await prisma.recipe.findUnique({
        where: { id }
    });
}

export const findRecipesByUserId = async (userId) => {
    return await prisma.recipe.findMany({
        where: { userId }
    });
}

export const updateRecipe = async (id, updateData) => {
    return await prisma.recipe.update({
        where: { id },
        data: updateData
    });
}

export const deleteRecipe = async (id) => {
    return await prisma.recipe.delete({
        where: { id }
    });
}