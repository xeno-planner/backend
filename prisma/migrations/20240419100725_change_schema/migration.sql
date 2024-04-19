/*
  Warnings:

  - You are about to drop the `PomodoroRound` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PomodoroSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TimeBlock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('low', 'medium', 'high');

-- DropForeignKey
ALTER TABLE "PomodoroRound" DROP CONSTRAINT "PomodoroRound_pomodoroSessionId_fkey";

-- DropForeignKey
ALTER TABLE "PomodoroSession" DROP CONSTRAINT "PomodoroSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "Stats" DROP CONSTRAINT "Stats_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- DropForeignKey
ALTER TABLE "TimeBlock" DROP CONSTRAINT "TimeBlock_userId_fkey";

-- DropTable
DROP TABLE "PomodoroRound";

-- DropTable
DROP TABLE "PomodoroSession";

-- DropTable
DROP TABLE "Stats";

-- DropTable
DROP TABLE "Task";

-- DropTable
DROP TABLE "TimeBlock";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "work_interval" INTEGER DEFAULT 50,
    "break_interval" INTEGER DEFAULT 10,
    "intervals_count" INTEGER DEFAULT 7,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "priority" "Priority",
    "is_completed" BOOLEAN DEFAULT false,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "time_block" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "duration" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 1,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "time_block_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pomodoro_session" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_completed" BOOLEAN DEFAULT false,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "pomodoro_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pomodoro_round" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "totalSeconds" INTEGER NOT NULL,
    "is_completed" BOOLEAN DEFAULT false,
    "pomodoro_session_id" TEXT NOT NULL,

    CONSTRAINT "pomodoro_round_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_block" ADD CONSTRAINT "time_block_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pomodoro_session" ADD CONSTRAINT "pomodoro_session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pomodoro_round" ADD CONSTRAINT "pomodoro_round_pomodoro_session_id_fkey" FOREIGN KEY ("pomodoro_session_id") REFERENCES "pomodoro_session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
