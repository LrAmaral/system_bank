import { Label } from "@radix-ui/react-label";
import { Button } from "../components/ui/button";
import { Password } from "./password";
import { Input } from "./ui/input";

export function Access() {
  return (
    <form className="space-y-6 flex w-full flex-col items-center justify-center">
        <h2 className="font-bold text-start w-full text-xl">Acessar</h2>
        <div className="space-y-2 w-full">
        <div className="space-y-2 w-full">
          <Label htmlFor="conta">Conta</Label>
          <Input id="conta" className="text-black w-full" placeholder="Conta" />
        </div>{" "}
        <Password />
      </div>
      <Button
        className="bg-red-500 text-white w-full hover:bg-red-700 transition ease-in-out duration-300  font-medium hover:text-white"
        type="submit"
      >
        Acessar Conta
      </Button>
    </form>
  );
}
