/*
  Warnings:

  - You are about to drop the column `gamertag` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[gamerTag]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gamerTag` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User.gamertag_unique";

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "lolName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "gamertag",
ADD COLUMN     "gamerTag" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User.gamerTag_unique" ON "User"("gamerTag");
