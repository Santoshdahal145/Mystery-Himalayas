import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { SingleRentalProvider } from "@/types/rentalProvider";

interface CardProps extends SingleRentalProvider {
  onEditClick: VoidFunction;
  onDeleteClick: VoidFunction;
}

export const RentalProviderCard = ({
  address,
  email,
  introduction,
  logo,
  name,
  phone,
  onDeleteClick,
  onEditClick,
}: CardProps) => {
  return (
    <Card className="max-w-sm w-full shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
      {/* Edit + Delete Buttons */}
      <div className="absolute top-3 right-3 flex gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={onEditClick}
          className="h-8 w-8"
        >
          <Pencil className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="destructive"
          onClick={onDeleteClick}
          className="h-8 w-8"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>

      <CardHeader className="flex flex-col items-center gap-3">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border border-gray-200">
          <Image src={logo} alt={name} fill className="object-cover" />
        </div>

        <CardTitle className="text-lg font-bold text-center">{name}</CardTitle>

        <CardDescription className="text-center text-sm text-muted-foreground">
          {introduction}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 mt-2">
        <p className="text-sm">
          <span className="font-semibold">Email:</span> {email}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Phone:</span> {phone}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Address:</span>{" "}
          {`${address?.street}, ${address?.city}, ${address?.state}, ${address?.country}`}
        </p>
      </CardContent>
    </Card>
  );
};
