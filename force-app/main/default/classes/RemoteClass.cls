public class RemoteClass {
 // Volume to be modified
    Integer volume;
    // Constant for maximum volume value
    static final Integer Max_vol = 50;    
    
    // Constructor
    public RemoteClass(Integer v) {
        // Set initial value for volume
        volume = v;
    }
    
    public Integer IncreaseVolume(Integer amount){
       volume+=amount;
           if(volume>Max_vol){
               volume=Max_vol;
           }
        return volume;
    }
    
    public Integer DecreaseVolume(Integer amount){
        volume-=amount;
        if(volume<0){
            volume=0;
        }
        return volume;
    }
    
    
}