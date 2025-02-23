"use server";

import { db } from "@/app/_lib/prisma";
import { CreateChampionship } from "../_interfaces/create-championship";

export const createChampionship = async (
  championshipPayload: CreateChampionship
) => {
  try {
    const newChampionship = await db.championship.create({
      data: {
        name: championshipPayload.name,
        blindTime: championshipPayload.blindTime,
        entryFee: championshipPayload.price,
        players: {
          create: championshipPayload.playerIds.map((id) => ({
            player: { connect: { id } },
          })),
        },
        startTime: championshipPayload.startTime,
      },
      include: {
        players: {
          include: {
            player: true,
          },
        },
      },
    });
    return newChampionship;
  } catch (error) {
    console.error("Error creating championship:", error);
    throw new Error("Failed to create championship.");
  }
};
