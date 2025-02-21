import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { PlayerSelectProps } from "../_interfaces/player-select-props";

export function PlayerSelect({ players, onValueChange }: PlayerSelectProps) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecione um jogador" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Jogadores</SelectLabel>
          {players.map((p) => (
            <SelectItem key={p.value} value={p.value}>
              {p.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
