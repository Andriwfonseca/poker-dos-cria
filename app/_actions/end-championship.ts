"use server";

import { db } from "@/app/_lib/prisma";
import { EndChampionshipProps } from "../_interfaces/end-championship-props";

export const endChampionship = async ({
  championshipId,
  firstPlaceId,
  secondPlaceId,
}: EndChampionshipProps) => {
  try {
    const updatedChampionship = await db.championship.update({
      where: {
        id: championshipId,
      },
      data: {
        ...(firstPlaceId && { firstPlaceId }),
        ...(secondPlaceId && { secondPlaceId }),
      },
    });

    const championshipPlayers = await db.championshipPlayer.findMany({
      where: { championshipId },
      select: { playerId: true },
    });

    // Atualiza todos os jogadores adicionando 1 partida (matches)
    await db.player.updateMany({
      where: {
        id: { in: championshipPlayers.map((p) => p.playerId) },
      },
      data: {
        matches: { increment: 1 },
      },
    });

    const winnerIds = [firstPlaceId, secondPlaceId].filter(Boolean);

    // Atualiza primeiro e segundo colocado adicionando 1 vitória (wins)
    if (winnerIds.length > 0) {
      await db.player.updateMany({
        where: {
          id: { in: winnerIds },
        },
        data: {
          wins: { increment: 1 },
        },
      });
    }

    return updatedChampionship;
  } catch (error) {
    console.error("Error ending championship:", error);
    throw new Error("Failed to end championship.");
  }
};
