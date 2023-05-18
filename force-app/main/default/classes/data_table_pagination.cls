public with sharing class data_table_pagination {
    @AuraEnabled(cacheable=true)
    Public static caseDataWrapper loadCases(Decimal pageNumber,Decimal pageSize){
        caseDataWrapper res = new caseDataWrapper();
        Integer pSize;
        if(pageSize!=null && pageSize!=0.0){
            pSize = (Integer)pageSize;    
        }else{
            pSize=10;  
        } 
        Integer pNumber = (Integer)pageNumber;
        Integer offset = (pNumber - 1) * pSize;
        list<case> c = new list<case>();
        String query = 'Select id,CaseNumber,Subject, priority from Case LIMIT :pSize OFFSET :offset';
        String countQuery = 'select count() from case';
        c = Database.query(query);
        res.caseList = c;
        res.totalRecords = Database.countQuery(countQuery);
        res.recordStart = offset + 1;
        Integer recordEnd = pSize * pNumber;
        res.recordEnd = res.totalRecords >= recordEnd ? recordEnd : res.totalRecords; 
        return res;
    }

    public class caseDataWrapper {
        @AuraEnabled
        public Integer totalRecords {get;set;}
        @AuraEnabled
        public Integer recordStart {get;set;}
        @AuraEnabled
        public Integer recordEnd {get;set;}
        @AuraEnabled
        public List<case> caseList {get;set;}
    } 
}