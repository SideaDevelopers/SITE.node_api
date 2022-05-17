/*
  Warnings:

  - Added the required column `limit_date` to the `jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "limit_date" TIMESTAMP(3) NOT NULL;
