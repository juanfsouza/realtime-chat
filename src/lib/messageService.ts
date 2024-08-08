import prisma from '@/lib/prismaClient';

export const sendMessage = async (userId: number, text: string) => {
  return await prisma.message.create({
    data: {
      text,
      userId,
    },
  });
};

export const getMessages = async (userId: number) => {
  return await prisma.message.findMany({
    where: { userId },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
};
