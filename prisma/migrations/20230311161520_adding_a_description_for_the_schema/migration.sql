/*
  Warnings:

  - You are about to drop the `Renter` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Advert" ADD COLUMN     "descriptionCar" TEXT;

-- DropTable
DROP TABLE "Renter";
