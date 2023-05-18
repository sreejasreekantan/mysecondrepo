public class PropertyClass {
//define class

    //declare private variable
    public static Double VarDiscAmt ;
    //define function to apply discount
    public static void ApplyPropDiscount(list<Cust_Property__c> VarPropertyList){
       for(Cust_Property__c VarPropertyObj: VarPropertyList){
           if(VarPropertyObj.Type__c=='Row House'){
               VarDiscAmt=(VarPropertyObj.Property_Price__c *5)/100;
               VarPropertyObj.Property_Price__c= VarPropertyObj.Property_Price__c - VarDiscAmt; 
           }
           if(VarPropertyObj.Type__c=='Villa'){
               VarDiscAmt=(VarPropertyObj.Property_Price__c *4)/100;
               VarPropertyObj.Property_Price__c= VarPropertyObj.Property_Price__c - VarDiscAmt; 
           }
           
       }
    }

}