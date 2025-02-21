export interface PlayerSelectProps {
  players: { title: string; value: string }[];
  onValueChange: (value: string) => void;
}
