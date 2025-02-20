"use client";

import { getChampionship } from "@/app/_actions/get-championship";
import { ChampionshipPlayer } from "@/app/_interfaces/championship-player";
import { use, useEffect, useState } from "react";

interface ChampionshipIdPageProps {
  params: Promise<{
    championshipId: string;
  }>;
}

const ChampionshipIdPage = ({ params }: ChampionshipIdPageProps) => {
  const { championshipId } = use(params);

  const [players, setPlayers] = useState<ChampionshipPlayer[]>([]);

  useEffect(() => {
    const fetchChampionship = async () => {
      try {
        const championship = await getChampionship(championshipId);

        if (championship?.players) {
          setPlayers(championship.players);
        } else {
          setPlayers([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchChampionship();
  }, []);
  return (
    <div>
      {players.map((p) => (
        <div key={p.championshipId}>{p.player.name}</div>
      ))}
    </div>
  );
};

export default ChampionshipIdPage;
