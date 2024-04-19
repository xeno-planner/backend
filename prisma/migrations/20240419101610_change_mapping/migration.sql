/*
  Warnings:

  - You are about to drop the column `totalSeconds` on the `pomodoro_round` table. All the data in the column will be lost.
  - Added the required column `total_seconds` to the `pomodoro_round` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pomodoro_round" DROP COLUMN "totalSeconds",
ADD COLUMN     "total_seconds" INTEGER NOT NULL;
