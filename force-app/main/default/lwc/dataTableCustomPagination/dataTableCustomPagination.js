import { LightningElement, wire, api, track  } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';
 
export default class dataTableCustomPagination extends LightningElement {
    @track loader = false;
    @track error = null;
    @track pageSize = 10;
    @track pageNumber = 1;
    @track totalRecords = 0;
    @track totalPages = 0;
    @track recordEnd = 0;
    @track recordStart = 0;
    @track isPrev = true;
    @track isNext = true;
    @track accounts = [];
    @track selection = [];
    @api accId;
    @track Columns = [
        { label: 'Account Name', fieldName: 'Name', type: 'text'},
        { label: 'Account Number', fieldName: 'AccountNumber', type: 'text'},
        { label: 'Industry', fieldName: 'Industry', type: 'text'},
        { label: 'Phone', fieldName: 'Phone', type: 'Phone'}
        ];
    //On load
    connectedCallback() {
        this.getAccounts();
    }
 
    //handle next
    handleNext(){
        this.pageNumber = this.pageNumber+1;
        this.getAccounts();
        var selectedIds=[];
        this.template.querySelector('lightning-datatable').selectedRows = selectedIds;
        for (var i = 0; i < this.selection.length; i++) {
            selectedIds.push(this.selection[i].Id);
        }
        this.selection.pop();
        this.selection.push(selectedIds[0].Id);
       // this.template.querySelector('lightning-datatable').selectedRows = selectedIds;
    }
 
    //handle prev
    handlePrev(){
        this.pageNumber = this.pageNumber-1;
        this.getAccounts();
        var selectedIds = [];
        this.template.querySelector('lightning-datatable').selectedRows = selectedIds;
        for (var i = 0; i < this.selection.length; i++) {
            selectedIds.push(this.selection[i].Id);
        }
        this.selection.pop();
        this.selection.push(selectedIds[0].Id);
        //this.template.querySelector('lightning-datatable').selectedRows = selectedIds;
    }
 
    //get accounts
    getAccounts(){
        this.loader = true;
        getAccountList({pageSize: this.pageSize, pageNumber : this.pageNumber})
        .then(result => {
            this.loader = false;
            if(result){
                var resultData = JSON.parse(result);
                this.accounts = resultData.accounts;
                this.pageNumber = resultData.pageNumber;
                this.totalRecords = resultData.totalRecords;
                this.recordStart = resultData.recordStart;
                this.recordEnd = resultData.recordEnd;
                this.totalPages = Math.ceil(resultData.totalRecords / this.pageSize);
                this.isNext = (this.pageNumber == this.totalPages || this.totalPages == 0);
                this.isPrev = (this.pageNumber == 1 || this.totalRecords < this.pageSize);
                this.template.querySelector('lightning-datatable').selectedRows=[];
                //this.accId  =   '';
                //this.selection =[];
            }
           // this.getSelectedRowBack();
        })
        .catch(error => {
            this.loader = false;
            this.error = error;
        });
    }
 
    //display no records
    get isDisplayNoRecords() {
        var isDisplay = true;
        if(this.accounts){
            if(this.accounts.length == 0){
                isDisplay = true;
            }else{
                isDisplay = false;
            }
        }
        return isDisplay;
    }

    //click on radio button
    handleRowAction(event){
        console.log('clicked');
        this.selection.pop();
        this.selection  =   event.detail.selectedRows;
      
        this.accId  =   this.selection[0].Id;
        //console.log('rows'+event.detail.selectedRows);
        console.log('selected'+ this.accId);
       
    }

    //retain selected option on pagination
    getSelectedRowBack(){
        this.template.querySelector('lightning-datatable').selectedRows=[];
        var selectedIds = [];
        if(this.accounts.length > 0){

            for(let i=0; i<this.accounts.length; i++){
                console.log('accountId From List'+this.accounts[i].Id+'-selected'+this.accId);
                if(this.accounts[i].Id === this.accId){
                    console.log('selected');
                   // let  rows  = [this.accId];
                 
                   // this.selection   =  rows;
                    //this.selectedRows.push(this.accounts[i].Id);
                    selectedIds.push(this.accounts[i].Id);
                   // console.log('MYROW'+this.selection[0].Id);
                   break;
                  // this.template.querySelector('lightning-datatable').selectedRows = selectedIds;
                }
                else{
                    console.log('rejected');
                    //this.selection =[];
                    
                }
            }
           this.selection.push(selectedIds);
            console.log('this.selectedRows'+ this.selection[0].Id);
          
        }
    }
}