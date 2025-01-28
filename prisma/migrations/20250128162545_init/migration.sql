-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pixKey" TEXT NOT NULL,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "matches" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Championship" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "entryFee" DOUBLE PRECISION NOT NULL,
    "blindTime" INTEGER NOT NULL,
    "rebuyPlayerId" TEXT,
    "firstPlaceId" TEXT,
    "secondPlaceId" TEXT,

    CONSTRAINT "Championship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChampionshipPlayer" (
    "playerId" TEXT NOT NULL,
    "championshipId" TEXT NOT NULL,

    CONSTRAINT "ChampionshipPlayer_pkey" PRIMARY KEY ("playerId","championshipId")
);

-- AddForeignKey
ALTER TABLE "Championship" ADD CONSTRAINT "Championship_rebuyPlayerId_fkey" FOREIGN KEY ("rebuyPlayerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Championship" ADD CONSTRAINT "Championship_firstPlaceId_fkey" FOREIGN KEY ("firstPlaceId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Championship" ADD CONSTRAINT "Championship_secondPlaceId_fkey" FOREIGN KEY ("secondPlaceId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChampionshipPlayer" ADD CONSTRAINT "ChampionshipPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChampionshipPlayer" ADD CONSTRAINT "ChampionshipPlayer_championshipId_fkey" FOREIGN KEY ("championshipId") REFERENCES "Championship"("id") ON DELETE CASCADE ON UPDATE CASCADE;
