public class ParkerPenClass {

    
    public static void FuncParkerPenDiscCalc(list <Parken_Pen__c> VarPenObjList)
    {
        for(Parken_Pen__c VarPenObj:VarPenObjList)
        {
            if(VarPenObj.Price__c > 100)
            {
                VarPenObj.Price__c=VarPenObj.Price__c-20;
            }
        }
    }


}