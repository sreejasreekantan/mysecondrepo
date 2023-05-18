import { LightningElement, wire, api, track } from 'lwc';

import getContactList from '@salesforce/apex/contactPaginationLwcCtrl.getContactList';

export default class ContactPaginationLwc extends LightningElement {

    @track recordEnd = 0;
    @track recordStart = 0;
    @track pageNumber = 1;
    @track totalRecords = 0;
    @track totalPages = 0;
    @track loaderSpinner = false;
    @track error = null;
    @track pageSize = 10;    
    @track isPrev = true;
    @track isNext = true;
    @track contacts = [];
    @track selectedVal ;
    @track selectedStatus   =   false;
    connectedCallback() {
        this.getContacts();
    }
    
    renderedCallback(){
         this.retainSelectedRow(this.contacts);
    }
    
    handlePageNextAction(){
        this.pageNumber = this.pageNumber+1;
        this.getContacts();
        console.log('next');
         /* for(var i=0;i<this.contacts.length;i++){
              console.log('hi');
                console.log('next'+this.contacts[i].Id+'-'+this.contacts[i].Name);
          }
        if(this.contacts.length > 0){
           // this.retainSelectedRow(this.contacts);
        }*/
    }
 
   
    handlePagePrevAction(){
        this.pageNumber = this.pageNumber-1;
        this.getContacts();
        console.log('prev'+this.contacts.length);
        if(this.contacts.length > 0){
           // this.retainSelectedRow(this.contacts);
        }
    }
    
     allSelected(event) {
       /* let selectedRows = this.template.querySelectorAll('lightning-input');
        
        for(let i = 0; i < selectedRows.length; i++) {
            if(selectedRows[i].type === 'radio') {
                if( selectedRows[i].checked){
                    alert(selectedRows[i].value);
                }

            }
        }*/
        
        this.selectedVal    = event.target.value;
        this.selectedStatus =   true;
        alert('selected'+this.selectedVal);
    }
 
    
    getContacts(){
        this.loaderSpinner = true;
        getContactList({pageSize: this.pageSize, pageNumber : this.pageNumber})
        .then(result => {
            this.loaderSpinner = false;
            if(result){
                this.contacts   =[];
                console.log(result);
                var resultData = JSON.parse(result);               
                this.recordEnd = resultData.recordEnd;
                this.totalRecords = resultData.totalRecords;
                this.recordStart = resultData.recordStart;
                this.contacts = resultData.contacts;
                this.pageNumber = resultData.pageNumber;                
                this.totalPages = Math.ceil(resultData.totalRecords / this.pageSize);
                this.isNext = (this.pageNumber == this.totalPages || this.totalPages == 0);
                this.isPrev = (this.pageNumber == 1 || this.totalRecords < this.pageSize);
                
            }
        })
        .catch(error => {
            this.loaderSpinner = false;
            this.error = error;
        });
    }
    
   
    get isDisplayNoRecords() {
        var isDisplay = true;
        if(this.contacts){
            if(this.contacts.length == 0){
                isDisplay = true;
            }else{
                isDisplay = false;
            }
        }
        return isDisplay;
    }

    retainSelectedRow(allContacts){
        let selectedRows = this.template.querySelectorAll('lightning-input');

       console.log(allContacts.length +'-'+selectedRows.length);
        if(this.selectedStatus){
            
            for(var i=0;i<allContacts.length;i++){
           
                if(allContacts[i].Id    === this.selectedVal){
                    console.log('val'+allContacts[i].Id+'chk'+this.selectedVal);
                    selectedRows[i].checked =   true;
                   // this.template.querySelector('input[type=radio][name="options"][value="${selectedContact }"]').checked = true;
                }
                console.log('sel'+selectedRows[i].value);
            }
        }
    }

}