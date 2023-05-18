public class AccountFileAttachClass {
	 @AuraEnabled(cacheable=false)
    public static String attachGroupFileDocument(String recId,String contentDocId){
        ContentDocumentLink cdl = new ContentDocumentLink();
       
       /* cdl.ContentDocumentId = [
          SELECT ContentDocumentId 
          FROM ContentVersion 
          WHERE ContentDocumentId =: contentDocId
        ].ContentDocumentId;*/
        cdl.ContentDocumentId	=	contentDocId;
        cdl.LinkedEntityId = recId;
        // ShareType is either 'V', 'C', or 'I'
        // V = Viewer, C = Collaborator, I = Inferred
        cdl.ShareType = 'V';
        system.debug(cdl);
        try {
          Database.SaveResult result	=	Database.insert(cdl) ;
            if(result.isSuccess()){
                 return 'success';
            }
            else
            {
                Database.Error error = result.getErrors().get(0);
				String failedDML = error.getMessage();
                return failedDML;
            }
          //return cdl;
         
        } catch(DMLException e) {
          System.debug(e);
          return null;
        }
        
    }
}