package systembank;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import atm.CaixaEletronicoProxy;
import model.Account;
import services.DolarConverter;
import services.RealConverter;
import controller.MainController;
import factory.*;

public class Main {

    private static Map<String, String> accountToUserMap = new HashMap<>();
    private static Map<String, Account> accounts = new HashMap<>();

    public static void main(String[] args) {
        DolarConverter dolarConverter = new DolarConverter();
        RealConverter realConverter = new RealConverter();

        MainController controller = new MainController();

        Scanner scanner = new Scanner(System.in);

        boolean criarOutraConta = true;
        while (criarOutraConta) {
            System.out.println("Bem vindo ao CashEase!");
            System.out.println("Selecione o tipo de conta:");
            System.out.println("1. Poupança");
            System.out.println("2. Corrente");
            System.out.println();
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

            String usuario, senha;
            System.out.print("Digite seu nome de usuário: ");
            usuario = scanner.next();
            System.out.print("Digite sua senha: ");
            senha = scanner.next();

            Account account = controller.createAccountAndUser(factory);
            String accountNumber = account.getAccountNumber();
            accounts.put(accountNumber, account);
            accountToUserMap.put(accountNumber, usuario);

            System.out.println("Acesse sua conta:");
            System.out.print("Número da conta: ");
            String inputAccountNumber = scanner.next();
            System.out.print("Senha: ");
            String inputPassword = scanner.next();

            CaixaEletronicoProxy caixaEletronicoProxy = new CaixaEletronicoProxy(usuario, accountNumber, senha);

            if (!inputAccountNumber.equals(accountNumber)) {
                System.out.println("Número da conta inválido. Programa finalizado!");
                scanner.close();
                return;
            }

            if (!caixaEletronicoProxy.autenticarUsuario(usuario, inputAccountNumber, inputPassword)) {
                System.out.println("Senha inválida. Programa finalizado!");
                scanner.close();
                return;
            }

            String usuarioLogado = accountToUserMap.get(inputAccountNumber);
            System.out.println("Bem-vindo, " + usuarioLogado + "!");
            System.out.println("Login bem-sucedido!");

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
