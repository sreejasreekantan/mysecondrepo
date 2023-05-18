trigger AccountTrigger on Account (before insert,after insert) {
    
    switch on Trigger.operationType{
        when BEFORE_INSERT{
            for(Account a:Trigger.New){
                a.Description = 'Test Trigger';
            }
        }
        when AFTER_INSERT{
            AccountTriggerHandler.CreateContactforAccount(Trigger.New);
        }
    }//switch
    if(Trigger.isInsert && Trigger.isAfter){
        List<String> ratLst=new List<String>();
        for(Account a:Trigger.New){
            ratLst.add(a.Rating);
        }
       AccountTriggerhandler.callOutSample(ratLst);
    }   

}//class