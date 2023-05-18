@isTest
public class TestPropertyClass {
   @isTest
    static void TestFun1(){
      Cust_Property__c P1= new Cust_Property__c();
      P1.Property_Price__c = 300000;
      P1.Type__c = 'Row House';
        
        insert P1;
      Cust_Property__c P2 = new Cust_Property__c();
      P2 = [select Property_Price__c from Cust_Property__c where Id=:P2.Id];
    }
}