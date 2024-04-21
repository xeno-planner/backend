-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('requested', 'accepted', 'denied');

-- AlterTable
ALTER TABLE "user_verification" ADD COLUMN     "status" "VerificationStatus" DEFAULT 'requested';
