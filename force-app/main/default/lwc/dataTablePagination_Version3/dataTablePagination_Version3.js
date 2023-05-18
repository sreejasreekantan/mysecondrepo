import { LightningElement, wire, api, track } from 'lwc';
 import { refreshApex } from '@salesforce/apex';
 import getAccounts from '@salesforce/apex/AccountController.getAccounts';
 const columns = [
    { label: 'Name', fieldName: 'Name', type: 'text', sortable: true },
    { label: 'Phone', fieldName: 'Phone', sortable: true },
    { label: 'Type', fieldName: 'Type', sortable: true }
 ];
export default class DataTablePagination_Version3 extends LightningElement {
    @track loader = false;
    @track isModalOpen = false;
    @track value;
    @track error;
    @track data;
    @api sortedDirection = 'asc';
    @api sortedBy = 'Name';
    @api searchKey = '';
    result;
    @track selection = [];
    @track page = 1;
    @track items = [];
    @track data = [];
    @track columns;
    @track startingRecord = 1;
    @track endingRecord = 0;
    @track pageSize = '5';
    @track totalRecountCount = 0;
    @track totalPage = 0;
    isPageChanged = false;
    initialLoad = true;
    @track loadingData = false;
    mapAccount = new Map();
   
   
    @wire(getAccounts, { searchKey: '$searchKey', sortBy: '$sortedBy', sortDirection: '$sortedDirection' })
    wiredAccounts({ error, data }) {
        this.loader = true;
        if (data) {
            this.loader = false;
            this.processRecords(data);
            this.error = undefined;
        } else if (error) {
            this.loader = false;
            this.error = error;
            this.data = undefined;
        }
    }

    processRecords(data) {
        this.items = data;
        this.totalRecountCount = data.length;
        this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize);
        this.data = this.items.slice(0, this.pageSize);
        this.endingRecord = this.pageSize;
        this.columns = columns;
        this.loadingData  = true;
        this.template.querySelector(
                '[data-id="table"]'
              ).selectedRows = this.selection;
    }

    //clicking on previous button this method will be called
    previousHandler() {
        this.isPageChanged = true;
        if (this.page > 1) {
            this.page = this.page - 1; //decrease page by 1
            this.displayRecordPerPage(this.page);
        }
         /* var selectedIds = [];
        for (var i = 0; i < this.selection.length; i++) {
            selectedIds.push(this.selection[i].Id);
        }
        this.template.querySelector('[data-id="table"]').selectedRows = selectedIds;*/
      
    }

    //clicking on next button this method will be called
    nextHandler() {
        this.isPageChanged = true;
        if ((this.page < this.totalPage) && this.page !== this.totalPage) {
            this.page = this.page + 1; //increase page by 1
            this.displayRecordPerPage(this.page);
        }
       /* var selectedIds = [];
        for (var i = 0; i < this.selection.length; i++) {
            selectedIds.push(this.selection[i].Id);
        }
        this.template.querySelector('[data-id="table"]').selectedRows = selectedIds;*/
     
    }

    //Method to displays records page by page
    displayRecordPerPage(page) {
        this.startingRecord = ((page - 1) * this.pageSize);
        this.endingRecord = (this.pageSize * page);
        this.endingRecord = (this.endingRecord > this.totalRecountCount) ? this.totalRecountCount : this.endingRecord;
        this.data = this.items.slice(this.startingRecord, this.endingRecord);
        this.startingRecord = this.startingRecord + 1;
         this.loadingData  = true;
        this.template.querySelector(
                '[data-id="table"]'
              ).selectedRows = this.selection;
    }

   

   

    onRowSelection(event) {
        if (!this.isPageChanged || this.initialLoad) {
            if (this.initialLoad) this.initialLoad = false;
            this.processSelectedRows(event);
        } else {
            this.isPageChanged = false;
            this.initialLoad = true;
        }

    }

    processSelectedRows(evt){
     console.log('load...'+this.loadingData);    
    // List of selected items from the data table event.
    let updatedItemsSet = new Set();
    //this.selection  =[];
    
    // List of selected items we maintain.
    let selectedItemsSet = new Set(this.selection);

    // List of items currently loaded for the current view.
    let loadedItemsSet = new Set();


    this.data.map((event) => {
      console.log('load'+event.Id);
        loadedItemsSet.add(event.Id);
    });


    if (evt.detail.selectedRows) {
        evt.detail.selectedRows.map((event) => {
           console.log('updated'+event.Id);
            updatedItemsSet.add(event.Id);
        });


        // Add any new items to the selection list
        updatedItemsSet.forEach((id) => {
            if (!selectedItemsSet.has(id)) {
                selectedItemsSet.add(id);
            }
        });        
    }


    loadedItemsSet.forEach((id) => {
        if (selectedItemsSet.has(id) && !updatedItemsSet.has(id)) {
            // Remove any items that were unselected.
            selectedItemsSet.delete(id);
        }
    });

    
    this.selection = [...selectedItemsSet];
    let delcnt  =   this.selection.length-1;
    this.selection.splice(0,delcnt);
    console.log('-selection-'+JSON.stringify(this.selection));
     this.loadingData  = false;
    }

    /*processSelectedRows(selectedAccounts) {
        var newMap = new Map();
        for (var i = 0; i < selectedAccounts.length; i++) {
            if (!this.selection.includes(selectedAccounts[i])) {
                this.selection.push(selectedAccounts[i]);
            }
            this.mapAccount.set(selectedAccounts[i].Name, selectedAccounts[i]);
            newMap.set(selectedAccounts[i].Name, selectedAccounts[i]);
        }
        for (let [key, value] of this.mapAccount.entries()) {
            if (newMap.size <= 0 || (!newMap.has(key) && this.initialLoad)) {
                const index = this.selection.indexOf(value);
                if (index > -1) {
                    this.selection.splice(index, 1);
                }
            }
        }

    }*/


   

   
}