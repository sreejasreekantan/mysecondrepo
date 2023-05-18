public class MyController {
    public String myString {
        get {
            if (myString == null)
            { 	
                myString = 'a';
            }
        return myString;
        } 
        private set; 
    }
        
    public string getMyString (){
    return 'getMyString';
    }
    public string getStringMethod () {
        if (myString == null) {
        	myString = 'b';
        } 
        return myString;
    }
}