import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/_components/ui/dialog";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { ChampionshipProps } from "@/app/_interfaces/championship-props";

interface EditChampionshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  championship: ChampionshipProps | null;
}

export const EditChampionshipModal = ({
  isOpen,
  onClose,
  championship,
}: EditChampionshipModalProps) => {
  const [loading, setLoading] = useState(false);

  if (!championship) return null;

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simula uma requisição de salvamento (substitua pela sua lógica)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Campeonato salvo com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao salvar campeonato:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Campeonato</DialogTitle>
        </DialogHeader>
        <div>
          <p>Nome: {championship.name}</p>
          <p>Taxa de inscrição: {championship.entryFee}</p>
          <p>Horário de início: {championship.startTime?.toLocaleString()}</p>
          <p>Horário de fim: {championship.endTime?.toLocaleString()}</p>
          {/* Adicione campos de edição aqui */}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Salvando...
              </div>
            ) : (
              "Salvar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
