"use client";

import { getChampionship } from "@/app/_actions/get-championship";
import { Button } from "@/app/_components/ui/button";
import { Championship } from "@/app/_interfaces/championship";
import { ChampionshipPlayer } from "@/app/_interfaces/championship-player";
import { formatMinutesToTime } from "@/app/_utils/format-minutes-to-time";
import { use, useEffect, useState } from "react";
import { BLINDS } from "./_constants/blinds";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ChampionshipIdPageProps {
  params: Promise<{
    championshipId: string;
  }>;
}

const ChampionshipIdPage = ({ params }: ChampionshipIdPageProps) => {
  const { championshipId } = use(params);

  const [championship, setChampionship] = useState<Championship | undefined>();
  const [players, setPlayers] = useState<ChampionshipPlayer[]>([]);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [level, setLevel] = useState(0);
  const [isStartModalOpen, setIsStartModalOpen] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const [isReentryModalOpen, setIsReentryModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchChampionship = async () => {
      try {
        const championship = await getChampionship(championshipId);

        if (championship) {
          setChampionship(championship);
          setTimer(championship.blindTime);
        }

        if (championship?.players) {
          setPlayers(championship.players);
        } else {
          setPlayers([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchChampionship();
  }, [championshipId]);

  const handleStartTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    const id = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(id);
          setIntervalId(null);
          setIsStartModalOpen(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    setIntervalId(id);
  };

  const handleRestartTimer = () => {
    if (championship) {
      if (level < 13) setLevel((prevLevel) => prevLevel + 1);
      setTimer(championship.blindTime);
      setIsStartModalOpen(false);
      handleStartTimer();
    }
  };

  const handleFinishChampionship = () => {};

  const handleReentry = () => {};

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  useEffect(() => {
    if (timer === 0 && isStarted) {
      setIsStartModalOpen(true);
    }
  }, [timer, isStarted]);

  return (
    <div className="min-h-screen bg-[#020817] px-4 py-8 flex flex-col">
      <div className="mx-auto max-w-md flex-1">
        <h1 className="mb-6 text-center text-4xl font-bold text-white">
          <span>{championship?.name}</span>
          <div className="mt-10 text-8xl">{formatMinutesToTime(timer)}</div>
          <div className="mt-5 text-2xl">Nível {level}</div>
          <div className="mt-5">SB / BB</div>
          <div className="mt-3 text-6xl">
            {level > 0 && BLINDS[level - 1].small} /{" "}
            {level > 0 && BLINDS[level - 1].big}
          </div>
        </h1>
      </div>

      <footer className="mx-auto max-w-md flex justify-between mt-auto py-4 gap-x-4">
        <Button
          onClick={() => setIsFinishModalOpen(true)}
          className="rounded bg-[#509B52] hover:bg-green-600 px-4 py-2 text-white min-w-72 gap-3"
        >
          FINALIZAR
        </Button>
        <Button
          variant={"secondary"}
          onClick={() => setIsReentryModalOpen(true)}
          className="rounded px-4 py-2"
        >
          REENTRADA
        </Button>
      </footer>

      {/* Modal start timer */}
      <Dialog open={isStartModalOpen}>
        <DialogContent className="mx-auto max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Iniciar o temporizador
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 flex justify-between gap-2">
            <Button variant={"ghost"} onClick={() => router.push("/")}>
              Sair
            </Button>
            <Button
              onClick={() => {
                setIsStartModalOpen(false);
                handleRestartTimer();
              }}
              disabled={!championship?.name}
            >
              {!championship?.name && <Loader2 className="animate-spin" />}
              Iniciar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal reentry */}
      <Dialog open={isReentryModalOpen} onOpenChange={setIsReentryModalOpen}>
        <DialogContent className="mx-auto max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl">REENTRADA</DialogTitle>
          </DialogHeader>

          <div className="mt-4 flex justify-between gap-2">
            <Button
              variant={"ghost"}
              onClick={() => setIsReentryModalOpen(false)}
            >
              Sair
            </Button>
            <Button onClick={() => {}} disabled={!championship?.name}>
              {!championship?.name && <Loader2 className="animate-spin" />}
              Iniciar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal finish */}
      <Dialog open={isFinishModalOpen} onOpenChange={setIsFinishModalOpen}>
        <DialogContent className="mx-auto max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl">Finalizar campeonato</DialogTitle>
          </DialogHeader>

          <div className="mt-4 flex justify-between gap-2">
            <Button
              variant={"ghost"}
              onClick={() => setIsFinishModalOpen(false)}
            >
              Sair
            </Button>
            <Button
              onClick={() => {
                setIsFinishModalOpen(false);
              }}
              disabled={!championship?.name}
            >
              {!championship?.name && <Loader2 className="animate-spin" />}
              Iniciar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChampionshipIdPage;
