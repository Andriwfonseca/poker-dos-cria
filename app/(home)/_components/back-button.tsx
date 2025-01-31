import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

interface BackButtonProps {
  url: string;
  title: string;
}

const BackButton = ({ url, title }: BackButtonProps) => {
  return (
    <Button
      asChild
      variant="outline"
      className="bg-sky-500 mb-10 flex justify-start"
    >
      <Link href={`/${url}`} className="w-full ring-2">
        <div className="flex items-center ">
          <ChevronLeftIcon />
          <span className="ml-5 text-xl font-semibold">{title}</span>
        </div>
      </Link>
    </Button>
  );
};

export default BackButton;
