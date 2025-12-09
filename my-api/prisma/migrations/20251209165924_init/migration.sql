/*
  Warnings:

  - Added the required column `updatedAt` to the `Agency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `RentalProvider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agency" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "RentalProvider" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
