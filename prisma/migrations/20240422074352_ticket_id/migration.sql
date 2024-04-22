/*
  Warnings:

  - Added the required column `ticket_id` to the `user_verification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_verification" ADD COLUMN     "ticket_id" TEXT NOT NULL;
