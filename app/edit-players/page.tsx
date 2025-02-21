"use client";

import { useEffect, useState } from "react";
import { Player } from "../_interfaces/player";
import { getPlayers } from "../_actions/get-players";
import { SkeletonCardPlayer } from "../players/_components/skeleton-card-player";
import { Card } from "../_components/ui/card";
import { Input } from "../_components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../_components/ui/dialog";
import { Label } from "../_components/ui/label";
import { Loader2 } from "lucide-react";
import { Button } from "../_components/ui/button";
import { toast } from "../_hooks/use-toast";
import { updatePlayer } from "../_actions/update-player";
import BackButton from "../(home)/_components/back-button";

const PASSWORD_SECRET = "198005";

const DEFAULT_EDIT_PLAYER: Player = {
  id: "",
  name: "",
  wins: 0,
  pixKey: "",
  matches: 0,
};

const EditPlayersPage = () => {
  const [password, setPassword] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [editedPlayer, setEditedPlayer] = useState<Player>(DEFAULT_EDIT_PLAYER);

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

    await updatePlayer(editedPlayer);

    setLoading(true);
    const updatedPlayers = await getPlayers();

    setPlayers(updatedPlayers);
    setLoading(false);

    toast({
      title: "Usuário atualizado",
      description: `${editedPlayer.name}, foi atualizado com sucesso!`,
    });

    setEditModalIsOpen(false);
    setLoadingModal(false);
  };

  const handleOpenModal = (player: Player) => {
    setEditedPlayer(player);
    setEditModalIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#020817] px-4 py-8">
      <div className="mx-auto max-w-md space-y-4">
        {password != PASSWORD_SECRET && (
          <Input
            id="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder="Informe a senha"
          />
        )}

        {password == PASSWORD_SECRET && loading && <SkeletonCardPlayer />}

        {password == PASSWORD_SECRET &&
          !loading &&
          players.map((player) => (
            <Card
              key={player.name}
              className="cursor-pointer p-4 transition-colors hover:bg-gray-50"
              onClick={() => handleOpenModal(player)}
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

        <Dialog open={editModalIsOpen} onOpenChange={setEditModalIsOpen}>
          <DialogContent className="mx-auto max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-xl">EDITAR JOGADOR</DialogTitle>
              <DialogDescription>Edite os dados do jogador.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={editedPlayer.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditedPlayer({ ...editedPlayer, name: e.target.value })
                  }
                  placeholder=""
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pixKey">Chave pix</Label>
                <Input
                  id="pixKey"
                  value={editedPlayer.pixKey}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditedPlayer({ ...editedPlayer, pixKey: e.target.value })
                  }
                  placeholder=""
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wins">Vitórias</Label>
                <Input
                  id="wins"
                  value={editedPlayer.wins}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditedPlayer({
                      ...editedPlayer,
                      wins: Number(e.target.value),
                    })
                  }
                  placeholder=""
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pixKey">Campeonatos</Label>
                <Input
                  id="matches"
                  value={editedPlayer.matches}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditedPlayer({
                      ...editedPlayer,
                      matches: Number(e.target.value),
                    })
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
                  Salvar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        <div className="mt-4">
          <BackButton url="/" title="Voltar" />
        </div>
      </div>
    </div>
  );
};

export default EditPlayersPage;
