import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

export const create = async (user: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.user.create({
    data: {
      user,
      password: hashedPassword,
    },
  });
};
