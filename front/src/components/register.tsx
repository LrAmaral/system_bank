import { Button } from "../components/ui/button";
import { Input } from "./ui/input";

export function Register() {
  return (
    <form className="w-2/3 space-y-6">
      <h2 className="font-semibold">Registre-se</h2>
      <Input />
      <Button
        className="bg-white hover:bg-black text-black hover:text-white"
        type="submit"
      >
        Criar Conta
      </Button>
    </form>
  );
}
