import { ChampionshipPlayer } from "./championship-player";

export interface Championship {
  id: string;
  name: string;
  entryFee: number;
  blindTime: number;
  rebuyPlayerId: string | null;
  firstPlaceId: string | null;
  secondPlaceId: string | null;
  players: ChampionshipPlayer[];
}
