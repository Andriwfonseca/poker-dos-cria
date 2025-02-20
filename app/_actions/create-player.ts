"use server";

import { db } from "@/app/_lib/prisma";
import { CreatePlayer } from "../_interfaces/create-player";

export const createPlayer = async (playerPayload: CreatePlayer) => {
  try {
    const newPlayer = await db.player.create({
      data: {
        name: playerPayload.name,
        pixKey: playerPayload.pixKey,
      },
    });
    return newPlayer;
  } catch (error) {
    console.error("Error creating player:", error);
    throw new Error("Failed to create player.");
  }
};
