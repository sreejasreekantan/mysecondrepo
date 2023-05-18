public class AccountController {	
     
    @AuraEnabled(cacheable=true)//Get Account Records
    public static String getAccountList(Integer pageSize, Integer pageNumber){
        String jsonDT = '';
         
        //Offset for SOQL
        Integer offset = (pageNumber - 1) * pageSize;
         
        //Total Records
        Integer totalRecords = [SELECT COUNT() FROM Account LIMIT 100];
        Integer recordEnd = pageSize * pageNumber;
         
        AccountDTWrapper objDT =  new AccountDTWrapper();  
        objDT.pageSize = pageSize;
        objDT.pageNumber = pageNumber;
        objDT.recordStart = offset + 1;
        objDT.recordEnd = totalRecords >= recordEnd ? recordEnd : totalRecords;
        objDT.totalRecords = totalRecords;
        objDT.accounts = [SELECT Id, Name, AccountNumber, Industry, Phone FROM Account LIMIT :pageSize OFFSET :offset];
        jsonDT = JSON.serialize(objDT);
        return jsonDT;
    }
     
    public class AccountDTWrapper {
        public Integer pageSize {get;set;}
        public Integer pageNumber {get;set;}
        public Integer totalRecords {get;set;}
        public Integer recordStart {get;set;}
        public Integer recordEnd {get;set;}
        public List<Account> accounts {get;set;}
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String searchKey, String sortBy, String sortDirection) {        
        String query = 'SELECT Id, Name,Phone,Type FROM Account';            
        if (String.isNotEmpty(searchKey)) {
            String key = '%' + searchKey + '%';
            query += ' WHERE Name LIKE :key';
        }
        if (String.isNotEmpty(sortBy) && String.isNotEmpty(sortDirection)){
            query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
        } 
        query	+=	' LIMIT 22';
        return Database.query(query);
    }
    
    @AuraEnabled //invoked from aura component auraDataTablePagination
    public static  List<Account> getAccounts_Aura(Integer pageSize, Integer pageNumber){
        Integer offset = (pageNumber - 1) * pageSize;
        List<Account> accList = new List<Account>();
        accList = [SELECT Id, Name, AccountNumber, Industry, Phone FROM Account LIMIT :pageSize OFFSET :offset];
        return accList;
    }
     
    //Delete Account
    @AuraEnabled
    public static void deleteAccount(Account acc){
        Delete acc;
    }
    
      @AuraEnabled
    public static List<Account> getAccountsWithOffset(String pageSize, String pageNumber){
        Integer ps = Integer.valueOf(pageSize);
        Integer pn = Integer.valueOf(pageNumber)-1;
        
        /*List<Account> accounts = [SELECT
               Id, Name, Phone, Rating, Active__c
               FROM Account LIMIT :Integer.valueOf(ps) OFFSET :(ps*pn)];
        return accounts;*/
        List<Account> accounts = [SELECT
               Id, Name,BillingStreet
               FROM Account WITH SECURITY_ENFORCED LIMIT :Integer.valueOf(ps) OFFSET :(ps*pn)];
        return accounts;
    }//getAccountsWithOffset
    
    @AuraEnabled(cacheable=true)
   public static List<Opportunity> getOpps( String searchKey, String sortBy,       String sortDirection) {
      
       String query = 'SELECT Id, Name,StageName,CloseDate FROM Opportunity';
       system.debug('query---'+query);
       if ( searchKey != null && searchKey != '' ) {
           String key = '%' + searchKey + '%';
           query += ' WHERE Name LIKE :key';
       }
       if ( sortBy != null && sortDirection != null ) {
           query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
       }
       query = query + ' LIMIT 10';
       return Database.query( query );
   }
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getRelatedContacts(Id accountId){
        return [select Id,Name, Phone, Email from Contact where AccountId=:accountId];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getRelatedContactsByFilter(Id accountId,String key){
        String query='select Id,Name, Phone, Email from Contact where AccountId=:accountId and Name like \'%'+key+'%\'';
        return Database.query(query);
    }
}//class