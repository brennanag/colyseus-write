import { auth } from "@colyseus/auth";
import { prisma } from "../lib/prisma";

auth.settings.onFindUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

auth.settings.onRegisterWithEmailAndPassword = async (
  email,
  hashedPassword,
  options
) => {
  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: options?.name,
    },
  });
};
