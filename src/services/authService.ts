require("dotenv").config();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export const auth = async (userName: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { user: userName } });

  if (!user) {
    return;
  }

  const passwordValid = await bcrypt.compare(password, user.password);

  if (!passwordValid) {
    return;
  }

  const token = jwt.sign({ sub: user.id }, process.env.SECRET, {
    expiresIn: "1h",
  });

  return { token, user };
};
