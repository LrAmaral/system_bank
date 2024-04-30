package systembank;

import java.util.Scanner;
import services.DolarConverter;
import services.RealConverter;
import view.MainView;
import controller.MainController;
import factory.*;

public class Main {
    
    public static void main(String[] args) {
        DolarConverter dolarConverter = new DolarConverter();
        RealConverter realConverter = new RealConverter();
        
        MainView view = new MainView();
        MainController controller = new MainController(view);

        Scanner scanner = new Scanner(System.in);

        boolean criarOutraConta = true;
        while (criarOutraConta) {
        	System.out.println("Bem vindo ao CashEase!");
            System.out.println("Selecione o tipo de conta:");
            System.out.println("1. Poupança");
            System.out.println("2. Corrente");
        	System.out.println('\n');
            System.out.print("Opção: ");
            int accountType = scanner.nextInt();
            AbstractFactory factory;
            switch (accountType) {
                case 1:
                    factory = new SavingFactory();
                    break;
                case 2:
                    factory = new CurrentFactory();
                    break;
                default:
                    System.out.println("Opção inválida. Programa finalizado!");
                    scanner.close();
                    return;
            }
            controller.createAccountAndUser(factory);

            boolean sairDoPrograma = false;
            while (!sairDoPrograma) {
                System.out.println("\nSelecione a moeda para conversão:");
                System.out.println("1. Real para Dólar");
                System.out.println("2. Dólar para Real");
                System.out.println("0. Sair");

                System.out.print("\nOpção: ");
                
                int choice = scanner.nextInt();

                double valueToConvert, convertedValue;
                switch (choice) {
                    case 1:
                        System.out.print("Digite o valor em reais: ");
                        valueToConvert = scanner.nextDouble();
                        convertedValue = dolarConverter.convertToDollar(valueToConvert);
                        System.out.println("\nValor convertido para dólar: $" + convertedValue);
                        break;
                    case 2:
                        System.out.print("Digite o valor em dólares: ");
                        valueToConvert = scanner.nextDouble();
                        convertedValue = realConverter.convertToReal(valueToConvert);
                        System.out.println("\nValor convertido para reais: R$" + convertedValue);
                        break;
                    case 0:
                        System.out.println("Deseja criar outra conta? (s/n)");
                        char criarOutra = scanner.next().charAt(0);
                        if (criarOutra == 's' || criarOutra == 'S') {
                            sairDoPrograma = true; 
                        } else {
                            criarOutraConta = false;
                            sairDoPrograma = true; 
                            System.out.println("Programa finalizado!");
                        }
                        break;
                    default:
                        System.out.println("Opção inválida. Por favor, selecione 1, 2 ou 0.");
                }
            }
        }
        scanner.close();
    }
}
