import { Button } from "../components/ui/button";
import { Password } from "./password";

export function Access() {
  return (
    <form className="w-2/3 space-y-6 flex flex-col items-center">
      <h2 className="font-semibold">Acesse</h2>
      <Password />
      <Button
        className="bg-white hover:bg-black text-black hover:text-white"
        type="submit"
      >
        Acessar
      </Button>
    </form>
  );
}
