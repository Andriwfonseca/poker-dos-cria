"use server";

import { db } from "@/app/_lib/prisma";

export const deleteChampionship = async (championshipId: string) => {
  try {
    // 1. Busca o campeonato para verificar se foi finalizado
    const championship = await db.championship.findUnique({
      where: { id: championshipId },
      select: {
        firstPlaceId: true,
        secondPlaceId: true,
      },
    });

    if (!championship) {
      throw new Error("Campeonato não encontrado.");
    }

    // 2. Busca todos os jogadores que participaram do campeonato
    const championshipPlayers = await db.championshipPlayer.findMany({
      where: { championshipId },
      select: { playerId: true },
    });

    const playerIds = championshipPlayers.map((p) => p.playerId);

    // 3. Subtrai 1 do campo `matches` de todos os jogadores
    await db.player.updateMany({
      where: {
        id: { in: playerIds },
      },
      data: {
        matches: { decrement: 1 },
      },
    });

    // 4. Subtrai 1 do campo `wins` dos vencedores (se houver)
    const winnerIds = [
      championship.firstPlaceId,
      championship.secondPlaceId,
    ].filter((id): id is string => Boolean(id));

    if (winnerIds.length > 0) {
      await db.player.updateMany({
        where: {
          id: { in: winnerIds },
        },
        data: {
          wins: { decrement: 1 },
        },
      });
    }

    // 5. Deleta o campeonato
    await db.championship.delete({
      where: { id: championshipId },
    });

    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar campeonato:", error);
    throw new Error("Falha ao deletar campeonato.");
  }
};
