"use client";

import { useEffect, useState } from "react";
import BackButton from "../(home)/_components/back-button";
import CardChampionship from "./_components/card-championship";
import { getChampionships } from "../_actions/get-championships";
import { Championship } from "../_interfaces/championship";

const ChampionshipsPage = () => {
  const [championships, setChampionships] = useState<Championship[]>();

  useEffect(() => {
    const fetchChampionships = async () => {
      const championships = await getChampionships();

      setChampionships(championships);
    };

    fetchChampionships();
  }, []);
  return (
    <div className="min-h-screen bg-[#020817] px-4 py-8">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-center text-4xl font-bold text-white">
          Campeonatos
        </h1>
        <div className="space-y-2">
          {championships &&
            championships.map((c) => (
              <CardChampionship
                key={c.id}
                name={c.name}
                firstPlaceId={c.firstPlaceId}
                secondPlaceId={c.secondPlaceId}
                players={c.players}
              />
            ))}
        </div>
        <div className="mt-4">
          <BackButton url="/" title="Voltar" />
        </div>
      </div>
    </div>
  );
};

export default ChampionshipsPage;
