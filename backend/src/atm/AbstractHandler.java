package atm;

abstract class AbstractHandler implements Handler {
    protected Handler nextHandler;

    @Override
    public void setNextHandler(Handler handler) {
        this.nextHandler = handler;
    }

    protected void passToNextHandler(String usuario, String conta, String senha) throws Exception {
        if (nextHandler != null) {
            nextHandler.handleRequest(usuario, conta, senha);
        }
    }
}
