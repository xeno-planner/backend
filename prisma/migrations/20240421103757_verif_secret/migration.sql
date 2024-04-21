/*
  Warnings:

  - Added the required column `secret` to the `user_verification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_verification" ADD COLUMN     "secret" TEXT NOT NULL;
