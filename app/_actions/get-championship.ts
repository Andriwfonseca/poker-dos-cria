"use server";

import { db } from "@/app/_lib/prisma";

export const getChampionship = async (id: string) => {
  const championship = await db.championship.findUnique({
    where: {
      id,
    },
    include: {
      players: {
        include: {
          player: true,
        },
      },
    },
  });

  return championship;
};
