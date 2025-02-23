"use client";

import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import BackButton from "../(home)/_components/back-button";
import { MultiSelect } from "../_components/ui/multi-select";
import { getPlayers } from "../_actions/get-players";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createChampionship } from "../_actions/create-championship";
import { CreateChampionship } from "../_interfaces/create-championship";

type PlayerList = {
  value: string;
  label: string;
};

export default function Championship() {
  const [price, setPrice] = useState(5);
  const [blindTime, setBlindTime] = useState(15);
  const [players, setPlayers] = useState<PlayerList[]>([]);
  const [isGetPlayerLoading, setIsGetPlayerloading] = useState(false);
  const [selectedPlayersId, setSelectedPlayersId] = useState<string[]>([]);
  const [isSelectPlayerModalOpen, setIsSelectPlayerModalOpen] = useState(false);
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isloadingStart, setIsloadingStart] = useState(false);
  const router = useRouter();

  const handleGetPlayerList = async () => {
    setIsSelectPlayerModalOpen(true);
    setIsGetPlayerloading(true);

    const players = await getPlayers();
    const playerList = players.map((p) => {
      return {
        value: p.id,
        label: p.name,
      };
    });

    setIsGetPlayerloading(false);
    setPlayers(playerList);
  };

  const handleSelectPlayers = (selectedValues: string[]) => {
    setSelectedPlayersId(selectedValues);
  };

  const handleStartChampionship = async () => {
    setIsloadingStart(true);

    const today = new Date();
    const formattedDate = today.toLocaleDateString("pt-BR");

    const championshipPayload: CreateChampionship = {
      name: `CAMPEONATO #${formattedDate}`,
      blindTime: blindTime,
      price: price,
      playerIds: selectedPlayersId,
      startTime: today,
    };

    const championship = await createChampionship(championshipPayload);

    setIsloadingStart(false);
    router.push(`play/${championship.id}`);
  };

  return (
    <div className="min-h-screen bg-[#020817] px-4 py-8">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-center text-4xl font-bold text-white">
          CAMPEONATO
        </h1>

        <Dialog
          open={isSelectPlayerModalOpen}
          onOpenChange={setIsSelectPlayerModalOpen}
        >
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              className="mb-6 w-full rounded-md bg-white text-base font-medium hover:bg-gray-100"
              onClick={() => handleGetPlayerList()}
            >
              SELECIONAR PARTICIPANTES
            </Button>
          </DialogTrigger>
          <DialogContent className="mx-auto max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-xl">
                SELECIONAR PARTICIPANTES
              </DialogTitle>
              <DialogDescription>
                Selecione os participantes do campeonato.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Lista de jogadores</Label>
                <MultiSelect
                  disabled={isGetPlayerLoading}
                  options={players}
                  onValueChange={handleSelectPlayers}
                  defaultValue={[]}
                  placeholder="Selecione os participantes"
                  variant="inverted"
                  animation={2}
                  maxCount={3}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  className="bg-[#020817]"
                  onClick={() => {
                    setIsSelectPlayerModalOpen(false);
                  }}
                >
                  Selecionar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="font-bold text-white" htmlFor="price">
              VALOR - R$
            </Label>
            <Input
              id="price"
              value={price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPrice(Number(e.target.value))
              }
              placeholder=""
            />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-white" htmlFor="price">
              TEMPO BLIND
            </Label>
            <Input
              id="blindTime"
              value={blindTime}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBlindTime(Number(e.target.value))
              }
              placeholder=""
            />
          </div>
        </div>

        <Dialog open={isStartModalOpen} onOpenChange={setIsStartModalOpen}>
          <DialogTrigger asChild>
            <div className="mt-16 flex justify-center">
              <Button
                className="w-48 h-24 text-4xl bg-[#509B52] hover:bg-green-600 transition-colors duration-200"
                onClick={() =>
                  console.log(selectedPlayersId, "selectedPlayersI")
                }
              >
                INICIAR
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="mx-auto max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-xl">
                Deseja iniciar o campeonato?
              </DialogTitle>
              <DialogDescription>
                Verifique se já selecionou todos os participantes e ajuste o
                valor e tempo de blind.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant={"ghost"}
                disabled={isloadingStart}
                onClick={() => setIsStartModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                disabled={isloadingStart || selectedPlayersId.length == 0}
                onClick={handleStartChampionship}
              >
                {isloadingStart && <Loader2 className="animate-spin" />}
                Iniciar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="mt-20">
          <BackButton url="/" title="Voltar" />
        </div>
      </div>
    </div>
  );
}
