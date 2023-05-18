trigger ParkerPen_trigger on Parken_Pen__c (after insert,after update,before update) {
	List<Parken_Pen__c> newData=Trigger.New;
    List<Parken_Pen__c> oldData=Trigger.Old;
    switch on Trigger.operationType {
        
        when AFTER_INSERT{
            system.debug('After insert');
            try{
           // system.debug('Old Field Data'+oldData[0].Update_field__c);
             system.debug('New Field Data'+newData[0].Update_field__c);
            }
            catch(Exception e){
                system.debug(e.getMessage());
            }
        }
        when AFTER_UPDATE{
            
            system.debug('After update');
             system.debug('Update -Old Field Data'+oldData[0].Update_field__c);
             system.debug('Update-New Field Data'+newData[0].Update_field__c);
        }
         when BEFORE_UPDATE{
            
            system.debug('before update');
             system.debug('before Update -Old Field Data'+oldData[0].Update_field__c);
             system.debug('before Update-New Field Data'+newData[0].Update_field__c);
        }
    }
}