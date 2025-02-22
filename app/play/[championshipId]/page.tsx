"use client";

import { getChampionship } from "@/app/_actions/get-championship";
import { Button } from "@/app/_components/ui/button";
import { Championship } from "@/app/_interfaces/championship";
import { ChampionshipPlayer } from "@/app/_interfaces/championship-player";
import { formatMinutesToTime } from "@/app/_utils/format-minutes-to-time";
import { use, useEffect, useRef, useState } from "react";
import { BLINDS } from "./_constants/blinds";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Label } from "@/app/_components/ui/label";
import { PlayerSelect } from "@/app/_components/player-select";
import { addRebuyToPlayer } from "@/app/_actions/add-rebuy-to-player";
import { endChampionship } from "@/app/_actions/end-championship";

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
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [isRebuyModalOpen, setIsRebuyModalOpen] = useState(false);
  const [playerList, setPlayerList] = useState<
    { title: string; value: string }[]
  >([{ title: "", value: "" }]);
  const [selectedPlayerRebuy, setSelectedPlayerRebuy] = useState<string>("");
  const [selectedPlayerFirstPlace, setSelectedPlayerFirstPlace] =
    useState<string>("");
  const [selectedPlayerSecondPlace, setSelectedPlayerSecondPlace] =
    useState<string>("");
  const [isLoadingRebuy, setIsLoadingRebuy] = useState(false);
  const [isLoadingEndChampionship, setIsLoadingEndChampionship] =
    useState(false);
  const alarmSoundRef = useRef<HTMLAudioElement | null>(null);

  const router = useRouter();

  useEffect(() => {
    let wakeLockInstance: WakeLockSentinel | null = null;

    const requestWakeLock = async () => {
      try {
        // Verifica se a API é suportada
        if ("wakeLock" in navigator) {
          wakeLockInstance = await navigator.wakeLock.request("screen");
          console.log("Tela mantida ativa!");
        } else {
          console.warn("API Screen Wake Lock não suportada neste navegador.");
        }
      } catch (err) {
        console.error("Erro ao solicitar wake lock:", err);
      }
    };

    // Solicita o wake lock quando o componente é montado
    requestWakeLock();

    // Libera o wake lock quando o componente é desmontado
    return () => {
      if (wakeLockInstance) {
        wakeLockInstance.release().then(() => {
          console.log("Wake Lock liberado.");
        });
      }
    };
  }, []);

  useEffect(() => {
    stopAlarm();

    const fetchChampionship = async () => {
      try {
        const championship = await getChampionship(championshipId);

        if (championship) {
          setChampionship(championship);
          setTimer(championship.blindTime * 60);
        }

        if (championship?.players) {
          setPlayers(championship.players);

          const formattedPlayerList = championship.players.map((p) => ({
            title: p.player.name,
            value: p.player.id,
          }));

          setPlayerList(formattedPlayerList);
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
      setTimer(championship.blindTime * 60);
      setIsStartModalOpen(false);
      handleStartTimer();
    }
  };

  const handlePlayerRebuyChange = (value: string) => {
    setSelectedPlayerRebuy(value);
  };

  const handlePlayerFirstPlaceChange = (value: string) => {
    setSelectedPlayerFirstPlace(value);
  };

  const handlePlayerSecondPlaceChange = (value: string) => {
    setSelectedPlayerSecondPlace(value);
  };

  const handleEndChampionship = async () => {
    setIsLoadingEndChampionship(true);

    await endChampionship({
      championshipId,
      firstPlaceId: selectedPlayerFirstPlace,
      secondPlaceId: selectedPlayerSecondPlace,
    });

    setIsLoadingEndChampionship(false);

    router.push("/");
  };

  const handleRebuy = async () => {
    setIsLoadingRebuy(true);

    await addRebuyToPlayer({ championshipId, playerId: selectedPlayerRebuy });

    setIsLoadingRebuy(false);
    setIsRebuyModalOpen(false);
  };

  const playAlarm = () => {
    alarmSoundRef.current = new Audio("/sounds/alarm.wav");
    alarmSoundRef.current.play().catch((error) => {
      console.error("Erro ao reproduzir o som:", error);
    });
  };

  const stopAlarm = () => {
    if (alarmSoundRef.current) {
      alarmSoundRef.current.pause();
      alarmSoundRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  useEffect(() => {
    if (timer === 0 && championship?.name) {
      playAlarm();
      setIsStartModalOpen(true);
    }
  }, [timer]);

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

      {players && <div>{/**apagar depois eslint*/}</div>}

      <footer className="mx-auto max-w-md flex justify-between mt-auto py-4 gap-x-4">
        <Button
          onClick={() => setIsEndModalOpen(true)}
          className="rounded bg-[#509B52] hover:bg-green-600 px-4 py-2 text-white w-44 gap-3"
        >
          FINALIZAR
        </Button>
        <Button
          variant={"secondary"}
          onClick={() => setIsRebuyModalOpen(true)}
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
            <Button
              variant={"ghost"}
              onClick={() => {
                stopAlarm();
                router.push("/");
              }}
            >
              Sair
            </Button>
            <Button
              onClick={() => {
                setIsStartModalOpen(false);
                stopAlarm();
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

      {/* Modal rebuy */}
      <Dialog open={isRebuyModalOpen} onOpenChange={setIsRebuyModalOpen}>
        <DialogContent className="mx-auto max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl">REENTRADA</DialogTitle>
            <DialogDescription>
              Selecione o participante que irá fazer a reentrada.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label className="pt-2" htmlFor="name">
                Lista de jogadores
              </Label>
              <PlayerSelect
                players={playerList}
                onValueChange={handlePlayerRebuyChange}
              />
            </div>
          </div>

          <div className="mt-4 flex justify-between gap-2">
            <Button
              variant={"ghost"}
              onClick={() => setIsRebuyModalOpen(false)}
            >
              Fechar
            </Button>
            <Button onClick={handleRebuy} disabled={isLoadingRebuy}>
              {isLoadingRebuy && <Loader2 className="animate-spin" />}
              Confirmar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal end */}
      <Dialog open={isEndModalOpen} onOpenChange={setIsEndModalOpen}>
        <DialogContent className="mx-auto max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl">FINALIZAÇÃO</DialogTitle>
            <DialogDescription>
              Selecione o 1º e 2º lugar do campeonato.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label className="pt-2" htmlFor="name">
                1º Lugar
              </Label>
              <PlayerSelect
                players={playerList}
                onValueChange={handlePlayerFirstPlaceChange}
              />
            </div>
            <div className="flex justify-between">
              <Label className="pt-2" htmlFor="name">
                2º Lugar
              </Label>
              <PlayerSelect
                players={playerList}
                onValueChange={handlePlayerSecondPlaceChange}
              />
            </div>
          </div>

          <div className="mt-4 flex justify-between gap-2">
            <Button variant={"ghost"} onClick={() => setIsEndModalOpen(false)}>
              Fechar
            </Button>
            <Button
              onClick={handleEndChampionship}
              disabled={isLoadingEndChampionship}
            >
              {isLoadingEndChampionship && <Loader2 className="animate-spin" />}
              Confirmar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChampionshipIdPage;
