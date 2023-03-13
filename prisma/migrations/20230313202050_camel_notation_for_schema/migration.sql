/*
  Warnings:

  - You are about to drop the column `emailrenter` on the `Advert` table. All the data in the column will be lost.
  - You are about to drop the column `firstnamerenter` on the `Advert` table. All the data in the column will be lost.
  - You are about to drop the column `namerenter` on the `Advert` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Advert_emailrenter_key";

-- AlterTable
ALTER TABLE "Advert" DROP COLUMN "emailrenter",
DROP COLUMN "firstnamerenter",
DROP COLUMN "namerenter",
ADD COLUMN     "emailRenter" TEXT,
ADD COLUMN     "firstNameRenter" TEXT,
ADD COLUMN     "nameRenter" TEXT;
