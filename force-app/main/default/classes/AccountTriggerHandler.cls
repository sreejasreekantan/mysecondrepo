public class AccountTriggerHandler {
	 public static void CreateContactforAccount(List<Account> acc){
        List<Contact> ctlist = new List<Contact>();
        for(Account a:acc){
            Contact ct= new Contact(LastName=a.Name+a.Id);
            ct.AccountId=a.Id;
            ctlist.add(ct);
        }

         	
            insert ctlist;
    }//CreateContactforAccount
     @future(Callout=True)
    public static void callOutSample(List<String> ratLst){
        List<Account> accList=New List<Account>{New Account(Name='A'),new Account(Name='B')};   
    }
    
}