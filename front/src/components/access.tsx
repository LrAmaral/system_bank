import { Button } from "../components/ui/button";
import { Password } from "./password";
import { Input } from "./ui/input";

export function Access() {
  return (
    <form className="space-y-6 flex w-full flex-col items-start">
      <Input placeholder="Conta" className="text-black"/>
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
