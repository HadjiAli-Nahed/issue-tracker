/*
  Warnings:

  - You are about to alter the column `title` on the `Issue` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Added the required column `description` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255);
