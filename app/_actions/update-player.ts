"use server";

import { db } from "@/app/_lib/prisma";
import { Player } from "../_interfaces/player";

export const updatePlayer = async (playerPayload: Player) => {
  try {
    const newPlayer = await db.player.update({
      where: {
        id: playerPayload.id,
      },
      data: {
        wins: playerPayload.wins,
        matches: playerPayload.matches,
        name: playerPayload.name,
        pixKey: playerPayload.pixKey,
      },
    });
    return newPlayer;
  } catch (error) {
    console.error("Error updating player:", error);
    throw new Error("Failed to update player.");
  }
};
