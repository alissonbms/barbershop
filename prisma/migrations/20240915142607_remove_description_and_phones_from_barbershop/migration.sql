/*
  Warnings:

  - You are about to drop the column `description` on the `Barbershop` table. All the data in the column will be lost.
  - You are about to drop the column `phones` on the `Barbershop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Barbershop" DROP COLUMN "description",
DROP COLUMN "phones";
