/*
  Warnings:

  - A unique constraint covering the columns `[twitterAccessToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[twitterRefreshToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "twitterAccessToken" TEXT,
ADD COLUMN     "twitterRefreshToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_twitterAccessToken_key" ON "User"("twitterAccessToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_twitterRefreshToken_key" ON "User"("twitterRefreshToken");
