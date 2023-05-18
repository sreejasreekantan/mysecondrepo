public class myclass{
class CustomException extends Exception{}
public static Account aQuery(){
Account theAccount;
try{
system.debug('Querying Accounts.');
theAccount = [SELECT Id FROM Account WHERE CreatedDate > TODAY];
}
catch(CustomException eX){
system.debug('Custom Exception.');
}
catch(QueryException eX){
system.debug('Query Exception.');
}
finally{
system.debug('Done.');
}
return theAccount;
}
}