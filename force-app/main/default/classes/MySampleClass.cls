public with sharing class MySampleClass {
    public string FirstName{set;get;}
    public string MiddleName{set;get;}
    public string LastName{set;get;}
    public string message{set;get;}
    public void showMessage()
    {
        message='FullName is '+FirstName+' '+MiddleName+' '+LastName;
    }
}