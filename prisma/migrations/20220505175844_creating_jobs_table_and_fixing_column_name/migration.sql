/*
  Warnings:

  - You are about to drop the column `ativo` on the `notices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notices" DROP COLUMN "ativo",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "occupation_area" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "describe" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);
