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
        {championships && (
          <CardChampionship
            name={championships[0].name}
            firstPlaceId={championships[0].firstPlaceId}
            secondPlaceId={championships[0].secondPlaceId}
            players={championships[0].players}
          />
        )}
        <div className="mt-4">
          <BackButton url="/" title="Voltar" />
        </div>
      </div>
    </div>
  );
};

export default ChampionshipsPage;
