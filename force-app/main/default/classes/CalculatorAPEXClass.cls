public class CalculatorAPEXClass {
	private static integer VarSumRes;
    private static integer VarMultRes;
    
    public static integer FuncAddition(integer VArA,integer VarB){
        VarSumRes=VArA+VArB;
      return VarSumRes; 
    }
    
     public static void FuncMultiplication(integer VArC,integer VarD){
         VarMultRes=VArC*VArD;
        system.debug('Result is '+VarMultRes);
    }
    
}