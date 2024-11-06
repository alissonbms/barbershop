import { hash } from "bcryptjs";

export const saltAndHashPassword = async (notHashedPassword: string) => {
  const hashedPassword = await hash(notHashedPassword, 10);

  return hashedPassword;
};
