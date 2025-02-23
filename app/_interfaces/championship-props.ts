import { ChampionshipPlayer } from "./championship-player";

export interface ChampionshipProps {
  id: string;
  name: string;
  entryFee: number;
  blindTime: number;
  firstPlaceId: string | null;
  secondPlaceId: string | null;
  players: ChampionshipPlayer[];
  startTime: Date | null;
  endTime: Date | null;
}
