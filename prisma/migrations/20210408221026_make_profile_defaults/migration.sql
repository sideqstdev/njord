/*
  Warnings:

  - Made the column `userId` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "lolName" SET DEFAULT E'',
ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "avatarUrl" SET DEFAULT E'';
