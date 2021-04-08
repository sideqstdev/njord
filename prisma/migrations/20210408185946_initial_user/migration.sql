/*
  Warnings:

  - You are about to drop the column `avatar` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `followerCount` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `followingCount` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `Follower` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Following` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Friend` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TournamentRole" AS ENUM ('ATTENDEE', 'MOD', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Following" DROP CONSTRAINT "Following_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_friendProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_profileId_fkey";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "avatar",
DROP COLUMN "followerCount",
DROP COLUMN "followingCount",
ADD COLUMN     "avatarUrl" TEXT;

-- DropTable
DROP TABLE "Follower";

-- DropTable
DROP TABLE "Following";

-- DropTable
DROP TABLE "Friend";

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "tags" TEXT[],
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
