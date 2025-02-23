import { ChampionshipPlayer } from "./championship-player";

export interface ChampionshipsProps {
  name: string;
  firstPlaceId: string | null;
  secondPlaceId: string | null;
  players: ChampionshipPlayer[];
  startTime: Date | null;
  endTime: Date | null;
}
