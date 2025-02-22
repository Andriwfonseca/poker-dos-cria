"use server";

import { db } from "@/app/_lib/prisma";
import { AddRebuyPlayer } from "../_interfaces/add-rebuy-player";

export const addRebuyToPlayer = async ({
  championshipId,
  playerId,
}: AddRebuyPlayer) => {
  try {
    const updatedChampionshipPlayer = await db.championshipPlayer.update({
      where: {
        playerId_championshipId: {
          playerId: playerId,
          championshipId: championshipId,
        },
      },
      data: {
        rebuyCount: { increment: 1 },
      },
    });

    return updatedChampionshipPlayer;
  } catch (error) {
    console.error("Error adding rebuy to player:", error);
    throw new Error("Failed to add rebuy.");
  }
};
