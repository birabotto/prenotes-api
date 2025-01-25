/*
  Warnings:

  - You are about to drop the column `department` on the `Prenote` table. All the data in the column will be lost.
  - Added the required column `departamentId` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departamentId` to the `Prenote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "departamentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Prenote" DROP COLUMN "department",
ADD COLUMN     "departamentId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Department";

-- CreateTable
CREATE TABLE "Departament" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Departament_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "Departament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prenote" ADD CONSTRAINT "Prenote_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "Departament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
