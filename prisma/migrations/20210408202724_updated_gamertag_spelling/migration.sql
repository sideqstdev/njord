/*
  Warnings:

  - You are about to drop the column `gamerTag` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[gamertag]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gamertag` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User.gamerTag_unique";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "gamerTag",
ADD COLUMN     "gamertag" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User.gamertag_unique" ON "User"("gamertag");
