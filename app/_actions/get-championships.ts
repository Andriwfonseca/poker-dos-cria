"use server";

import { db } from "@/app/_lib/prisma";

export const getChampionships = async () => {
  const championships = await db.championship.findMany({
    include: {
      players: {
        include: {
          player: true,
        },
      },
    },
  });

  return championships;
};
