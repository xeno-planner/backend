-- DropForeignKey
ALTER TABLE "user_verification" DROP CONSTRAINT "user_verification_user_id_fkey";

-- AddForeignKey
ALTER TABLE "user_verification" ADD CONSTRAINT "user_verification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
