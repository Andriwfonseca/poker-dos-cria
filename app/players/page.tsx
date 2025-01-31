"use client";

import { useState } from "react";
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

const players: Player[] = [
  {
    name: "Filipe Fonseca",
    wins: 50,
    championships: 38,
  },
  {
    name: "Roger Digão",
    wins: 50,
    championships: 38,
  },
  {
    name: "Fefe Zeferino",
    wins: 50,
    championships: 38,
  },
  {
    name: "Caco Fonseca",
    wins: 50,
    championships: 38,
  },
];

export default function Players() {
  const [newPlayer, setNewPlayer] = useState({ name: "", pixKey: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Creating player:", newPlayer);
  };

  return (
    <div className="min-h-screen bg-[#020817] px-4 py-8">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-center text-4xl font-bold text-white">
          JOGADORES
        </h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button
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
                <Button type="submit" className="bg-[#020817]">
                  Criar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <div className="space-y-4">
          {players.map((player) => (
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
                  {player.championships}
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
