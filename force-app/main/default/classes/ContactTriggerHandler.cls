public class ContactTriggerHandler {
    public static void getChildContactCountParent(List<Contact> lstContact){
        
        Set <Id> parentIdSet	=	 new Set<Id>();
       
        
        for(Contact con	: lstContact){
            parentIdSet.add(con.AccountId);
        }
        if(parentIdSet.size()>0){
        	updateParentAccount(parentIdSet);
        }
    }
    
    public static void updateParentAccount(Set<Id> parentIdSet){
         Map <Id,Integer> mapContact	=	 new Map<id,Integer>();
        List <Account> updateParentList	=	 new List<Account> ();
       List<Account> lstParentAccount	=	[SELECT Id,(select Id,Name From Contacts) From Account Where Id IN : parentIdSet];
        if(lstParentAccount.size()>0){
            for(Account acc : lstParentAccount){
                acc.Number_Of_Contacts_Record__c 	=	acc.Contacts.size();
                mapContact.put(acc.Id,acc.Contacts.size());
                updateParentList.add(acc);
            }
        }
        if(updateParentList.size()>0){
            update updateParentList;
        } 
    }
    public static void getChildContactCountOnUpdate(List<Contact> lstNewContact,Map<Id,Contact> mapOldContact){
        
        Set<Id> parentIdSet	= new Set<Id>();
        for(Contact con	:	 lstnewContact){
            parentIdSet.add(con.AccountId); // new parent id
            if(con.AccountId != mapOldContact.get(con.Id).AccountId){
                parentIdSet.add(mapOldContact.get(con.Id).AccountId); // old parent id if parent changes
            }
        }
        if(parentIdSet.size()>0){
        	updateParentAccount(parentIdSet);
        }
    }

}