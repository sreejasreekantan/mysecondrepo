public class TestGovernorLimit {

    public void myFunction()
    {
        Account varAcc= new Account();
        for(integer i=0;i<60;i++)
        {
           varAcc= [SELECT Name FROM Account WHERE Phone='111111111111'];
        }
    }
}