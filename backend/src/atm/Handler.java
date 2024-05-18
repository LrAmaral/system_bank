package atm;

interface Handler {
    void setNextHandler(Handler handler);
    void handleRequest(String usuario, String conta, String senha) throws Exception;
}
