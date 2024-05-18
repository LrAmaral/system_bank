package atm;

public class CaixaEletronicoProxy implements Atm {
    private CaixaEletronico caixaEletronico;
    private String usuarioValido;
    private String contaValida;
    private String senhaValida;
    private Handler chain;

    public CaixaEletronicoProxy(String usuarioValido, String contaValida, String senhaValida) {
        this.usuarioValido = usuarioValido;
        this.contaValida = contaValida;
        this.senhaValida = senhaValida;
        this.caixaEletronico = new CaixaEletronico();
        configureChain();
    }

    private void configureChain() {
        UsuarioValidator usuarioValidator = new UsuarioValidator();
        ContaValidator contaValidator = new ContaValidator();
        SenhaValidator senhaValidator = new SenhaValidator();

        usuarioValidator.setNextHandler(contaValidator);
        contaValidator.setNextHandler(senhaValidator);

        this.chain = usuarioValidator;
    }

    public boolean autenticarUsuario(String usuario, String conta, String senha) {
        try {
            chain.handleRequest(usuario, conta, senha);
            return usuario.equals(usuarioValido) && conta.equals(contaValida) && senha.equals(senhaValida);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public void sacar(double valor) {
        if (autenticarUsuario(usuarioValido, contaValida, senhaValida)) {
            caixaEletronico.sacar(valor);
        } else {
            System.out.println("Usuário não autenticado. Acesso negado.");
        }
    }

    @Override
    public void depositar(double valor) {
        if (autenticarUsuario(usuarioValido, contaValida, senhaValida)) {
            caixaEletronico.depositar(valor);
        } else {
            System.out.println("Usuário não autenticado. Acesso negado.");
        }
    }
}
