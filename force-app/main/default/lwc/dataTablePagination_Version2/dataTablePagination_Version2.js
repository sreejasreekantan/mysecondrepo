import { LightningElement} from "lwc";
import getAccountsWithOffset from "@salesforce/apex/AccountController.getAccountsWithOffset";
export default class DataTablePagination_Version2 extends LightningElement {
    data = [];
  pageNumber = 1;
  pageSize = 10;
  isLastPage = false;
  resultSize = 0;
  selection = [];
  hasPageChanged;
  error;
  loadingData = false;
  columns = [
    { label: "Name", fieldName: "Name", type: "text" },
    { label: "BillingStreet", fieldName: "BillingStreet", type: "text" }
  ];



  connectedCallback() {
    this.getAccounts();
  }

  renderedCallback(){
   console.log('render'+JSON.stringify(this.selection));
  }
  
  rowSelection(evt) {

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
    console.log('-selection-'+JSON.stringify(this.selection));
    this.loadingData  = false;
    
  }


  previousEve() {
    //Setting current page number
    let pageNumber = this.pageNumber;
    this.pageNumber = pageNumber - 1;
    //Setting pageChange variable to true
    this.hasPageChanged = true;
    this.getAccounts();
  }


  nextEve() {
    //get current page number
    let pageNumber = this.pageNumber;
    //Setting current page number
    this.pageNumber = pageNumber + 1;
    //Setting pageChange variable to true
    this.hasPageChanged = true;
    this.getAccounts();
  }


  get recordCount() {
    return (
      (this.pageNumber - 1) * this.pageSize +
      " to " +
      ((this.pageNumber - 1) * this.pageSize + this.resultSize)
    );
  }


  get disPre() {
    return this.pageNumber === 1 ? true : false;
  }


  getAccounts() {
    getAccountsWithOffset({
      pageSize: this.pageSize,
      pageNumber: this.pageNumber
    })
      .then(result => {
        let accountData = JSON.parse(JSON.stringify(result));
        this.data = accountData;
        if (accountData.length < this.pageSize) {
          this.isLastPage = true;
        } else {
          this.isLastPage = false;
        }
        this.resultSize = accountData.length;     
           //code
        this.loadingData  = true;
       
        console.log('calling rowSelection----'+ this.loadingData);
        this.template.querySelector(
                '[data-id="datarow"]'
              ).selectedRows = this.selection;
       
      })
      .catch(error => {
        this.error = error;
      });
  }
}