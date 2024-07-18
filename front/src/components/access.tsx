import { Label } from "@radix-ui/react-label";
import { Button } from "../components/ui/button";
import { Password } from "./password";
import { Input } from "./ui/input";

export function Access() {
  return (
    <form className="space-y-6 flex w-full flex-col items-center justify-center">
      <h2 className="font-semibold">Acessar</h2>
      <div>
        <Label htmlFor="conta">Conta</Label>
        <Input id="conta" className="text-black w-80" placeholder="Conta" />
      </div>{" "}
      <Password />
      <Button
        className="bg-white hover:bg-black text-black hover:text-white"
        type="submit"
      >
        Acessar Conta
      </Button>
    </form>
  );
}
