"use client";

import { useEffect, useState } from "react";
import { Card } from "@/app/_components/ui/card";

import { Player } from "@prisma/client";

import { getPlayers } from "../_actions/get-players";
import BackButton from "../(home)/_components/back-button";
import { SkeletonCardPlayer } from "../players/_components/skeleton-card-player";
import { Medal } from "lucide-react";

export default function Ranking() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      const players = (await getPlayers()) || [];
      // Ordenar os jogadores por vitórias (wins) em ordem decrescente
      const sortedPlayers = [...players].sort((a, b) => b.wins - a.wins);
      setPlayers(sortedPlayers);
      setLoading(false);
    };
    fetchPlayers();
  }, []);

  // Função para determinar a medalha com base na posição e empates
  const getMedal = (player: Player, players: Player[]) => {
    // Extrair valores únicos de vitórias e ordená-los em ordem decrescente
    const uniqueWins = [...new Set(players.map((p) => p.wins))].sort(
      (a, b) => b - a
    );

    // Verificar em qual grupo de vitórias o jogador está
    if (player.wins === uniqueWins[0]) return "gold"; // Ouro para o maior grupo
    if (player.wins === uniqueWins[1]) return "silver"; // Prata para o segundo maior grupo
    if (player.wins === uniqueWins[2]) return "bronze"; // Bronze para o terceiro maior grupo
    return null; // Sem medalha para os demais
  };

  return (
    <div className="min-h-screen bg-[#020817] px-4 py-8">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-center text-4xl font-bold text-white">
          JOGADORES
        </h1>

        <div className="space-y-4">
          {loading && <SkeletonCardPlayer />}

          {!loading &&
            players.map((player) => {
              const medal = getMedal(player, players);
              return (
                <Card
                  key={player.name}
                  className="cursor-pointer p-4 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="mb-1 text-lg font-medium">{player.name}</h2>
                    {/* Exibir ícone de ouro, prata ou bronze com base no grupo de vitórias */}
                    {medal === "gold" && (
                      <Medal className="size-6 text-yellow-400" /> // Ouro
                    )}
                    {medal === "silver" && (
                      <Medal className="size-6 text-gray-300" /> // Prata
                    )}
                    {medal === "bronze" && (
                      <Medal className="size-6 text-amber-800" /> // Bronze
                    )}
                  </div>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Vitórias:</span>{" "}
                      {player.wins}
                    </p>
                    <p>
                      <span className="font-medium">Campeonatos:</span>{" "}
                      {player.matches}
                    </p>
                  </div>
                </Card>
              );
            })}
        </div>
        <div className="mt-4">
          <BackButton url="/" title="Voltar" />
        </div>
      </div>
    </div>
  );
}
