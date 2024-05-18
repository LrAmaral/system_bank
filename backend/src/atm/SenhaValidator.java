package atm;

class SenhaValidator extends AbstractHandler {
    @Override
    public void handleRequest(String usuario, String conta, String senha) throws Exception {
        if (senha != null && senha.matches("\\d{6,}") && !contemSequencia(senha)) {
            passToNextHandler(usuario, conta, senha);
        } else {
            throw new Exception("Formato de senha inválido. A senha deve conter apenas números, ter pelo menos 6 dígitos e não pode conter sequências consecutivas.");
        }
    }
    
    private boolean contemSequencia(String senha) {
        for (int i = 0; i < senha.length() - 1; i++) {
            if (senha.charAt(i + 1) == senha.charAt(i) + 1) {
                return true; 
            }
        }
        return false; 
    }
}
