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

const players = [
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

export default function Championship() {
  const [price, setPrice] = useState(0);
  const [blindTime, setBlindTime] = useState(0)
  const [newPlayer, setNewPlayer] = useState({ name: "", pixKey: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Creating player:", newPlayer);
  };

  return (
    <div className="min-h-screen bg-[#020817] px-4 py-8">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-center text-4xl font-bold text-white">
          CAMPEONATO
        </h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              className="mb-6 w-full rounded-md bg-white text-base font-medium hover:bg-gray-100"
            >
              SELECIONAR PARTICIPANTES
            </Button>
          </DialogTrigger>
          <DialogContent className="mx-auto max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-xl">SELECIONAR PARTICIPANTES</DialogTitle>
              <DialogDescription>
                Selecione os participantes do campeonato.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Lista de jogadores</Label>
                <Input
                  id="name"
                  value={newPlayer.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewPlayer({ ...newPlayer, name: e.target.value })
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
          <div className="space-y-2">
            <Label className="font-bold text-white" htmlFor="price">VALOR - R$</Label>
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
            <Label className="font-bold text-white" htmlFor="price">TEMPO BLIND</Label>
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
        <div className="mt-16 flex justify-center">
          <Button className="w-48 h-24 bg-[#509B52] hover:bg-green-600 transition-colors duration-200">
            INICIAR
          </Button>
        </div>
        <div className="mt-20">
          <BackButton url="/" title="Voltar" />
        </div>
      </div>
    </div>
  );
}
