/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `models` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `models` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "models" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "models_name_key" ON "models"("name");
