-- CreateEnum
CREATE TYPE "Department" AS ENUM ('KITCHENS', 'LIVING_ROOMS', 'BEDROOMS');

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "prenoteId" INTEGER NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prenote" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "department" "Department" NOT NULL,

    CONSTRAINT "Prenote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_prenoteId_fkey" FOREIGN KEY ("prenoteId") REFERENCES "Prenote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
