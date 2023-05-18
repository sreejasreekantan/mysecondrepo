import { LightningElement, wire, api, track } from 'lwc';
 import { refreshApex } from '@salesforce/apex';
 import getAccounts from '@salesforce/apex/AccountController.getAccounts';
 const columns = [
    { label: 'Name', fieldName: 'Name', type: 'text', sortable: true },
    { label: 'Phone', fieldName: 'Phone', sortable: true },
    { label: 'Type', fieldName: 'Type', sortable: true }
 ];
 export default class ClientSidePagination extends LightningElement {
    @track loader = false;
    @track isModalOpen = false;
    @track value;
    @track error;
    @track data;
    @api sortedDirection = 'asc';
    @api sortedBy = 'Name';
    @api searchKey = '';
    result;
    @track allSelectedRows = [];
    @track page = 1;
    @track items = [];
    @track data = [];
    @track overallSelectedRows  =[];
    @track columns;
    @track startingRecord = 1;
    @track endingRecord = 0;
    @track pageSize = '5';
    @track totalRecountCount = 0;
    @track totalPage = 0;
    isPageChanged = false;
    initialLoad = true;
    mapAccount = new Map();
    get options() {
        return [
            { label: '5', value: '5' },
            { label: '10', value: '10' },
            { label: '15', value: '15' },
        ];
    }

    

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
    }

    //clicking on previous button this method will be called
    previousHandler() {
        this.isPageChanged = true;
        if (this.page > 1) {
            this.page = this.page - 1; //decrease page by 1
            this.displayRecordPerPage(this.page);
            this.processSelectedRows(this.page+1,this.page);
        }
        console.log('row sel on prev'+  this.allSelectedRows[0].Id);
        /*var selectedIds = [];
        for (var i = 0; i < this.allSelectedRows.length; i++) {
            selectedIds.push(this.allSelectedRows[i].Id);
        }
        this.template.querySelector('[data-id="table"]').selectedRows = selectedIds;*/
    }

    //clicking on next button this method will be called
    nextHandler() {
        this.isPageChanged = true;
        if ((this.page < this.totalPage) && this.page !== this.totalPage) {
            this.page = this.page + 1; //increase page by 1
            this.displayRecordPerPage(this.page);
            this.processSelectedRows(this.page-1,this.page);
        }
       
        /*var selectedIds = [];
        this.template.querySelector('[data-id="table"]').selectedRows = selectedIds;
        for (var i = 0; i < this.allSelectedRows.length; i++) {
            selectedIds.push(this.allSelectedRows[i].Id);
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
        
    }

   
    onRowSelection(event) {
        if (!this.isPageChanged || this.initialLoad) {
            if (this.initialLoad) this.initialLoad = false;
            var selectedRows = event.detail.selectedRows;
            var currentPageNumber = this.page;
            var currentSelectedRows = [];

            selectedRows.forEach(function(selectedRow) {
                currentSelectedRows.push(selectedRow.id);
            });
            this.allSelectedRows.pop();
            this.allSelectedRows    = currentSelectedRows;
            this.processSelectedRows(this.page,this.page);

            
        } else {
            
            this.isPageChanged = false;
            //this.initialLoad = true;
            //this.allSelectedRows.pop();
        }

    }

    processSelectedRows(oldPage,newPage) {
       /* this.allSelectedRows.pop();
        console.log('when click'+  this.allSelectedRows.length);
        for (var i = 0; i < selectedAccounts.length; i++) {
            if (!this.allSelectedRows.includes(selectedAccounts[i])) {
                this.allSelectedRows.push(selectedAccounts[i]);
            }          
        }
             console.log('row sel'+  this.allSelectedRows[0].Id);*/
             var currentSelectedRows = this.allSelectedRows;
             var overallSelectedRows =this.overallSelectedRows || {};
             
             overallSelectedRows[oldPage] = currentSelectedRows;
             
             
             this.overallSelectedRows = overallSelectedRows;
             this.allSelectedRows = overallSelectedRows[newPage] || [];
      
    }

    
 }