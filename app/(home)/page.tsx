import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";

export default function PokerApp() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-[#0a0a0a] border-2 border-gray-800 rounded-[40px] overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-48">
            <Image
              src="/images/logo.png"
              alt="Logo"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
          </div>

          <div className="px-6 pb-12 -mt-6 relative z-10">
            <h1 className="text-2xl font-bold text-white mb-8 text-center">
              POKER DOS CRIA
            </h1>

            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full bg-white hover:bg-gray-100 text-black font-medium py-6"
              >
                CAMPEONATO
              </Button>

              <Button
                variant="outline"
                className="w-full bg-white hover:bg-gray-100 text-black font-medium py-6"
              >
                JOGADORES
              </Button>

              <Button
                variant="outline"
                className="w-full bg-white hover:bg-gray-100 text-black font-medium py-6"
              >
                RANKING
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
