package atm;

class ContaValidator extends AbstractHandler {
    @Override
    public void handleRequest(String usuario, String conta, String senha) throws Exception {
        if (conta != null && !conta.isEmpty()) {
            passToNextHandler(usuario, conta, senha);
        } else {
            throw new Exception("Conta inválida.");
        }
    }
}
