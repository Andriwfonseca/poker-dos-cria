"use server";

import { db } from "@/app/_lib/prisma";

export const getPlayers = async () => {
  const players = await db.player.findMany();

  return players;
};
