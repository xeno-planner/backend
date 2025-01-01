-- CreateEnum
CREATE TYPE "Permissions" AS ENUM ('canAccessAdminPage');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role_id" TEXT;

-- CreateTable
CREATE TABLE "user_role" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "permissions" "Permissions"[] DEFAULT ARRAY[]::"Permissions"[],

    CONSTRAINT "user_role_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "user_role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
