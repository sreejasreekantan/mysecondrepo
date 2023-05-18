trigger ContactTrigger on Contact (after insert,after delete,after update,after undelete) {
    
    if(Trigger.isAfter){
        if(Trigger.isInsert || Trigger.isUnDelete){
            ContactTriggerHandler.getChildContactCountParent(Trigger.New);
        }
        if( Trigger.isDelete){
            ContactTriggerHandler.getChildContactCountParent(Trigger.Old);
        }
        if(Trigger.isUpdate){
            ContactTriggerHandler.getChildContactCountOnUpdate(Trigger.New,Trigger.oldMap);
        }
    }

}