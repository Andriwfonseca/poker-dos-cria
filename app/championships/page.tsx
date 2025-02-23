"use client";

import { useEffect, useState } from "react";
import BackButton from "../(home)/_components/back-button";
import CardChampionship from "./_components/card-championship";
import { getChampionships } from "../_actions/get-championships";
import { ChampionshipProps } from "../_interfaces/championship-props";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../_components/ui/context-menu";
import { EditChampionshipModal } from "./_components/edit-championship-modal";
import { DeleteConfirmationModal } from "./_components/delete-confirmation-modal";
import { Pencil, Trash2 } from "lucide-react";
import { deleteChampionship } from "../_actions/delete-championship";

const ChampionshipsPage = () => {
  const [championships, setChampionships] = useState<ChampionshipProps[]>();
  const [selectedChampionship, setSelectedChampionship] =
    useState<ChampionshipProps | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [championshipToDelete, setChampionshipToDelete] =
    useState<ChampionshipProps | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChampionships = async () => {
      const championships = await getChampionships();

      setChampionships(championships);
    };

    fetchChampionships();
  }, []);

  const handleOpenDeleteModal = (championship: ChampionshipProps) => {
    setChampionshipToDelete(championship);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setChampionshipToDelete(null);
  };

  const handleOpenEditModal = (championship: ChampionshipProps) => {
    setSelectedChampionship(championship);
    setIsEditModalOpen(true);

    console.log(championship, "champions");
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedChampionship(null);
  };

  const handleDeleteChampionship = async (championshipId: string) => {
    setLoading(true);
    try {
      await deleteChampionship(championshipId);

      setChampionships((prev) => prev?.filter((c) => c.id !== championshipId));

      handleCloseDeleteModal();
    } catch (error) {
      console.error("Erro ao deletar campeonato:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] px-4 py-8">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-center text-4xl font-bold text-white">
          Campeonatos
        </h1>
        <div>
          {championships &&
            championships.map((c) => (
              <ContextMenu key={c.id}>
                <ContextMenuTrigger>
                  <CardChampionship
                    name={c.name}
                    firstPlaceId={c.firstPlaceId}
                    secondPlaceId={c.secondPlaceId}
                    players={c.players}
                    startTime={c.startTime}
                    endTime={c.endTime}
                  />
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem onClick={() => handleOpenEditModal(c)}>
                    <div className="flex items-center gap-2 text-blue-500">
                      {" "}
                      <Pencil className="h-4 w-4" />
                      <span>Editar</span>
                    </div>
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => handleOpenDeleteModal(c)}>
                    <div className="flex items-center gap-2 text-red-500">
                      {" "}
                      <Trash2 className="h-4 w-4" />
                      <span>Deletar</span>
                    </div>
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
        </div>

        <EditChampionshipModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          championship={selectedChampionship}
        />

        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          loading={loading}
          onConfirm={() => {
            if (championshipToDelete) {
              handleDeleteChampionship(championshipToDelete.id);
            }
          }}
        />

        <div className="mt-4">
          <BackButton url="/" title="Voltar" />
        </div>
      </div>
    </div>
  );
};

export default ChampionshipsPage;
