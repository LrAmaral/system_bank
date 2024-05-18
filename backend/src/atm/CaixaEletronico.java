package atm;

public class CaixaEletronico implements Atm {
    public void sacar(double valor) {
        System.out.println("Sacando $" + valor);
    }

    public void depositar(double valor) {
        System.out.println("Depositando $" + valor);
    }
}
