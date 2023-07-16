import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw new Error("Error creating user");
  }
};

export const createUser = async (reqName: string, reqEmail: string) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: reqName,
        email: reqEmail,
      },
    });

    return user;
  } catch (error) {
    throw new Error("Erro ao criar usuário");
  }
};

export const getUserById = async (reqId: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: reqId,
      },
    });
    return user;
  } catch (error) {
    throw new Error("User not found");
  }
};

export const updateUser = async (
  reqId: number,
  reqName: string,
  reqEmail: string
) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: reqId,
      },
      data: {
        name: reqName,
        email: reqEmail,
      },
    });

    return user;
  } catch (error) {
    throw new Error("Error deleting user");
  }
};

export const deleteUser = async (reqId: number) => {
  try {
    const user = await getUserById(reqId);
    if (user) {
      await prisma.user.delete({
        where: {
          id: user.id,
        },
      });

      return user;
    }
  } catch (error) {
    throw new Error("Error deleting user");
  }
};
