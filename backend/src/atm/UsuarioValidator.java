package atm;

class UsuarioValidator extends AbstractHandler {
    @Override
    public void handleRequest(String usuario, String conta, String senha) throws Exception {
        if (usuario != null && !usuario.isEmpty()) {
            passToNextHandler(usuario, conta, senha);
        } else {
            throw new Exception("Nome de usuário inválido.");
        }
    }
}
