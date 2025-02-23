import { Badge } from "@/app/_components/ui/badge";
import { Card } from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { ChampionshipsProps } from "@/app/_interfaces/championships-props";
import { formatDate } from "@/app/_utils/format-date";

const CardChampionship = ({
  name,
  players,
  firstPlaceId,
  secondPlaceId,
  startTime,
  endTime,
}: ChampionshipsProps) => {
  const playerNames = players.map((p) => p.player.name);
  const firstPlacePlayer = players.find((p) => p.playerId == firstPlaceId);
  const secondPlacePlayer = players.find((p) => p.playerId == secondPlaceId);
  const rebuys = players.map((p) => {
    return {
      name: p.player.name,
      count: p.rebuyCount,
    };
  });

  const hasRebuy = rebuys.some((r) => r.count > 0);

  return (
    <Card className="cursor-pointer mt-2 p-4 transition-colors hover:bg-gray-50">
      <h2 className="mb-1 text-lg font-medium">{name}</h2>
      {startTime && endTime && (
        <div>
          <div className="flex space-x-2">
            <div>Início:</div>
            <div className="text-muted-foreground">{formatDate(startTime)}</div>
          </div>
          <div className="flex space-x-2">
            <div>Fim:</div>
            <div className="text-muted-foreground">{formatDate(endTime)}</div>
          </div>
        </div>
      )}
      <div className="space-y-1 text-sm">
        <div className="space-y-4">
          <div className="space-x-2 flex mt-2">
            <span className="font-medium">Jogadores:</span>
            <div className="space-x-1">
              {playerNames.map((name, i) => (
                <Badge key={i}>{name}</Badge>
              ))}
            </div>
          </div>
          {hasRebuy && (
            <div className="space-y-2">
              <span className="font-medium">Reentradas:</span>
              {rebuys.map((rebuy, i) => {
                if (rebuy.count === 0) return null;
                return (
                  <div key={i} className="flex space-x-2">
                    <Badge>{rebuy.name}</Badge>
                    <Input id="rebuy" value={rebuy.count} disabled={true} />
                  </div>
                );
              })}
            </div>
          )}

          {firstPlacePlayer && (
            <div className="space-y-2">
              {firstPlacePlayer?.player.name && (
                <div className="space-x-2 flex">
                  <span className="font-medium">1º Lugar:</span>
                  <Badge>{firstPlacePlayer.player.name}</Badge>
                </div>
              )}

              {secondPlacePlayer?.player.name && (
                <div className="space-x-2 flex">
                  <span className="font-medium">2º Lugar:</span>
                  <Badge>{secondPlacePlayer.player.name}</Badge>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CardChampionship;
