import prisma from '@/lib/prismaClient';

export const createUser = async (email: string, password: string) => {
  return await prisma.user.create({
    data: {
      email,
      password, // Lembre-se de hash a senha antes de salvar
    },
  });
};

export const updateUserProfile = async (userId: number, username: string, imageUrl: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      username,
      imageUrl,
    },
  });
};

export const getUserById = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};
