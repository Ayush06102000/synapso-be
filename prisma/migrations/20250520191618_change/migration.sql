/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Content` table. All the data in the column will be lost.
  - Added the required column `urlType` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "imageUrl",
ADD COLUMN     "urlType" TEXT NOT NULL;
