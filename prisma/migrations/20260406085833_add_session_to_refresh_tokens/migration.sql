/*
  Warnings:

  - A unique constraint covering the columns `[refresh_token_id]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `refresh_token_id` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "refresh_token_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sessions_refresh_token_id_key" ON "sessions"("refresh_token_id");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_refresh_token_id_fkey" FOREIGN KEY ("refresh_token_id") REFERENCES "refresh_tokens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
