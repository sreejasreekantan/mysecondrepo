({
    getAccounts : function(component, helper) {
        var action = component.get("c.getAccountsWithOffset");
        action.setStorable();
        var pageSize = component.get("v.pageSize").toString();
        var pageNumber = component.get("v.pageNumber").toString();
            
        action.setParams({
            'pageSize' : pageSize,
            'pageNumber' : pageNumber
        });
        action.setCallback(this,function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log('Response Time: '+((new Date().getTime())-requestInitiatedTime));
                if(response.getReturnValue().length < component.get("v.pageSize")){
                    component.set("v.isLastPage", true);
                } else{
                    component.set("v.isLastPage", false);
                }
                
                //Modify response to include the page number as well 
                //in the id attribute of each row
                //This will help us to filter out the rows displayed on each page
                response.getReturnValue().forEach(function(row) {
                   row.Id = row.Id+'-'+pageNumber;
                });
                
                component.set("v.resultSize", response.getReturnValue().length);
                component.set("v.data", response.getReturnValue());
                //Set selected rows with our selection attribute which has id of each attribute -->s
                component.find("accountDataTable").set("v.selectedRows",component.get("v.selection"));
            }
        });
        var requestInitiatedTime = new Date().getTime();
        $A.enqueueAction(action);
    },
   
 })