-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "advantages" TEXT[] DEFAULT ARRAY['']::TEXT[];
