package adapter;
import services.DolarConverter;
import services.RealConverter;
import converter.CurrencyConverter;

public class Adapter implements CurrencyConverter {
    private DolarConverter dolarConverter;
    private RealConverter realConverter;
    private boolean convertToDollar;
    
    public Adapter(RealConverter realConverter) {
        this.realConverter = realConverter;
        this.convertToDollar = true;
    }
    
    public Adapter(DolarConverter dolarConverter) {
        this.dolarConverter = dolarConverter;
        this.convertToDollar = false;
    }
    
    @Override
    public double convert(double value) {
        if (convertToDollar) {
            return realConverter.convertToReal(value);
        } else {
            return dolarConverter.convertToDollar(value);
        }
    }
}