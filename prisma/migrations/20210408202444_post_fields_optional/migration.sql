-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "content" DROP NOT NULL,
ALTER COLUMN "imageUrl" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;
