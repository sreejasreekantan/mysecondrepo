@isTest
public class DataUtilTest {

    @isTest static void loadTestData(){
        list <sObject> ls = new list<sObject>();
        ls= Test.loadData(Account.sobjectType, 'testAccount');
        System.assert(ls.size()==3);
        Account a1= (Account)ls[0];
        system.debug(a1.Name);
        
    }
}