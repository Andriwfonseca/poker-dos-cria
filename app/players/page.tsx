"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
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
import { getPlayers } from "../_actions/get-players";
import { Player } from "@prisma/client";
import { createPlayer } from "../_actions/create-player";
import { Loader2 } from "lucide-react";
import { SkeletonCardPlayer } from "./_components/skeleton-card-player";
import { useToast } from "../_hooks/use-toast";

export default function Players() {
  const [newPlayer, setNewPlayer] = useState({ name: "", pixKey: "" });
  const [players, setPlayers] = useState<Player[]>([]);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    const fetchPlayers = async () => {
      const players = await getPlayers();
      setPlayers(players);
      setLoading(false);
    };
    fetchPlayers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingModal(true);

    await createPlayer(newPlayer);

    setLoading(true);
    const updatedPlayers = await getPlayers();

    setPlayers(updatedPlayers);
    setLoading(false);

    toast({
      title: "Usuário cadastrado",
      description: `${newPlayer.name}, foi cadastrado com sucesso!`,
    });

    setCreateModalIsOpen(false);
    setLoadingModal(false);
  };

  return (
    <div className="min-h-screen bg-[#020817] px-4 py-8">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-center text-4xl font-bold text-white">
          JOGADORES
        </h1>

        <Dialog open={createModalIsOpen} onOpenChange={setCreateModalIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setCreateModalIsOpen(true)}
              variant="secondary"
              className="mb-6 w-full rounded-md bg-white text-base font-medium hover:bg-gray-100"
            >
              CRIAR NOVO
            </Button>
          </DialogTrigger>
          <DialogContent className="mx-auto max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-xl">NOVO JOGADOR</DialogTitle>
              <DialogDescription>
                Informe os dados do jogador que será criado.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={newPlayer.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewPlayer({ ...newPlayer, name: e.target.value })
                  }
                  placeholder=""
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pixKey">Chave pix</Label>
                <Input
                  id="pixKey"
                  value={newPlayer.pixKey}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewPlayer({ ...newPlayer, pixKey: e.target.value })
                  }
                  placeholder=""
                />
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-[#020817]"
                  disabled={loadingModal}
                >
                  {loadingModal && <Loader2 className="animate-spin" />}
                  Criar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <div className="space-y-4">
          {loading && <SkeletonCardPlayer />}

          {!loading &&
            players.map((player) => (
              <Card
                key={player.name}
                className="cursor-pointer p-4 transition-colors hover:bg-gray-50"
              >
                <h2 className="mb-1 text-lg font-medium">{player.name}</h2>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Vitórias:</span> {player.wins}
                  </p>
                  <p>
                    <span className="font-medium">Campeonatos:</span>{" "}
                    {player.matches}
                  </p>
                  <p>
                    <span className="font-medium">Pix:</span> {player.pixKey}
                  </p>
                </div>
              </Card>
            ))}
        </div>
        <div className="mt-4">
          <BackButton url="/" title="Voltar" />
        </div>
      </div>
    </div>
  );
}
