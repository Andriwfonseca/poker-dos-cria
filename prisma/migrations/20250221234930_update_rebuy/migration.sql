/*
  Warnings:

  - You are about to drop the column `rebuyPlayerId` on the `Championship` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Championship" DROP CONSTRAINT "Championship_rebuyPlayerId_fkey";

-- AlterTable
ALTER TABLE "Championship" DROP COLUMN "rebuyPlayerId";

-- AlterTable
ALTER TABLE "ChampionshipPlayer" ADD COLUMN     "rebuyCount" INTEGER NOT NULL DEFAULT 0;
