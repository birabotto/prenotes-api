/*
  Warnings:

  - You are about to drop the column `departamentId` on the `Prenote` table. All the data in the column will be lost.
  - You are about to drop the `Departament` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `departmentId` to the `Prenote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Prenote" DROP CONSTRAINT "Prenote_departamentId_fkey";

-- AlterTable
ALTER TABLE "Prenote" DROP COLUMN "departamentId",
ADD COLUMN     "departmentId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Departament";

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Prenote" ADD CONSTRAINT "Prenote_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
