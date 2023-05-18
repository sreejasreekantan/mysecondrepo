({
    /*
     * This finction defined column header
     * and calls getAccounts helper method for column data
     * editable:'true' will make the column editable
     * */
    doInit : function(component, event, helper) {        
        component.set('v.columns', [
            {label: 'Name', fieldName: 'Name', type: 'text', 
             actions:[
                 {label: 'All',
                  checked: false,
                  name:'All'},
                 {label: 'Active',
                  checked: false,
                  name:'Active'}]},
            {label: 'Phone', fieldName: 'Phone', type: 'phone'},
            {label: 'Active', fieldName: 'Active__c', type: 'text'},
            
        ]);
        
        helper.getAccounts(component, helper);
    },
    
    onNext : function(component, event, helper) { 
        //get current page numbe
        var pageNumber = component.get("v.pageNumber");
        //Setting current page number
        component.set("v.pageNumber", pageNumber+1);
        //Setting pageChange variable to true
        component.set("v.hasPageChanged", true);
        
        helper.getAccounts(component, helper);
    },
    
    onPrev : function(component, event, helper) {        
        //get current page number
        var pageNumber = component.get("v.pageNumber");
        //Setting current page number
        component.set("v.pageNumber", pageNumber-1);
        //Setting pageChange variable to true
        component.set("v.hasPageChanged", true);
        
        helper.getAccounts(component, helper);
    },
    
    /**
     * This method will keep record of all selected rows
     * */
    onRowSelection : function(component, event, helper) {
        // Avoid any operation if page has changed
        // as this event will be fired when new data will be loaded in page 
        // after clicking on next or prev page
        if(!component.get("v.hasPageChanged") || component.get("v.initialLoad")){
			//set initial load to false
            component.set("v.initialLoad", false);
            //Get currently select rows, This will only give the rows available on current page
            var selectedRows = event.getParam('selectedRows');
            
            //Get all selected rows from datatable, this will give all the selected data from all the pages
            var allSelectedRows = component.get("v.selection");
            
            //Get current page number
            var currentPageNumber = component.get("v.pageNumber");
            
            //Process the rows now
            //Condition 1 -> If any new row selected, add to our allSelectedRows attribute
            //Condition 2 -> If any row is deselected, remove from allSelectedRows attribute
            //Solution - Remove all rows from current page from allSelectedRows attribute and then add again
    
            //Removing all rows coming from curent page from allSelectedRows
            var i = allSelectedRows.length;
            while (i--) {
                var pageNumber = allSelectedRows[i].split("-")[1];
                if (pageNumber && pageNumber == currentPageNumber) { 
                    allSelectedRows.splice(i, 1);
                } 
            }
            
            //Adding all the new selected rows in allSelectedRows
            selectedRows.forEach(function(row) {
                allSelectedRows.push(row.Id);
            });
            
            //Setting new value in selection attribute
            component.set("v.selection", allSelectedRows);
        } else{
             component.set("v.hasPageChanged", false);
        }
    },
    
    
})