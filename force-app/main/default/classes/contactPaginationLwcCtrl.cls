public with sharing class contactPaginationLwcCtrl {

    public class ContactItemWrapper {       
        public Integer recordStart {get;set;}
        public Integer pageNumber {get;set;}
        public Integer totalRecords {get;set;}
        public Integer recordEnd {get;set;}
        public Integer pageSize {get;set;}       
        public List<Contact> contacts {get;set;}
    }
    
    @AuraEnabled
    public static String getContactList(Integer pageSize, Integer pageNumber){
        String jsonObjItm = '';
         
        
        Integer offset = (pageNumber - 1) * pageSize;         
        
        Integer totalRecords = [SELECT COUNT() FROM Contact];
        Integer recordEnd = pageSize * pageNumber;
         
        ContactItemWrapper conObj =  new ContactItemWrapper();  
        conObj.pageNumber = pageNumber;
        conObj.pageSize = pageSize;        
        conObj.recordStart = offset + 1;
        conObj.recordEnd = totalRecords >= recordEnd ? recordEnd : totalRecords;
        conObj.totalRecords = totalRecords;
        conObj.contacts = [SELECT Id, Name, FirstName, LastName, Email, Phone, Title FROM Contact  order by Name LIMIT :pageSize OFFSET :offset];
        jsonObjItm = JSON.serialize(conObj);
        return jsonObjItm;
    }

}