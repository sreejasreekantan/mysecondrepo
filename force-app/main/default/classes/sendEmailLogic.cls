public class sendEmailLogic {

    public String tomail{get;set;}
    public String ccmail{get;set;}
    public String replymail{get;set;}
    
    public void sendMail(){
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        if(tomail!=null && tomail!=''){
            String[] to = new String[] {tomail};
            email.setToAddresses(to);
        }
        
        if(ccmail!=null && ccmail!=''){
            String[] cc= new String[] {ccmail};
            email.setCcAddresses(cc);
        }
        
        if(replymail!=null && replymail!=''){
            
            email.setInReplyTo(replymail) ;
        }
        
        email.setSubject('Congrats your order placed');
        email.setHtmlBody('Hi , This is an auto generated mail.<br/><br/> Your order is placed successfully.<br/><br/> Congrats. Thank you');
        try{
            Messaging.sendEmail(new Messaging.SingleEmailMessage[]{email});
        }catch(Exception e){
            system.debug(e.getMessage());
        }
        
        tomail='';ccmail='';replymail='';
    } 
}//class