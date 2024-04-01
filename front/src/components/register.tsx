import { Button } from "../components/ui/button";

export function Register() {
  return (
    <form className="w-2/3 space-y-6">
      <h2 className="font-semibold">Registre-se</h2>
      <Button
        className="bg-white hover:bg-black text-black hover:text-white"
        type="submit"
      >
        Criar
      </Button>
    </form>
  );
}
