global class MyBatchJob implements Database.Batchable<SObject>,Database.Stateful ,Schedulable {

		global List<Case> lstToSend = new List<Case>();
       public final string query;
       public MyBatchJob() {

            query = 'Select Id,Service_Line__c  From Case';

       }    

       public void execute(SchedulableContext sc) {
            Database.executeBatch(this, 100);
       }

       public Database.QueryLocator start(Database.BatchableContext bc) {
            return Database.getQueryLocator(query);
       }

       public void execute(Database.BatchableContext bc, List<Case> scope) {

        
           for(Case obj	:	scope){
             lstToSend.add(obj);  
           }
           

       }

       public void finish(Database.BatchableContext bc) {
          system.debug('JOB IS FINISHED'+lstToSend);
       }

}