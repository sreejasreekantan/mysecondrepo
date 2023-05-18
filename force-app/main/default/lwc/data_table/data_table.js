import { LightningElement,track,wire } from 'lwc';
import loadCases from '@salesforce/apex/data_table_pagination.loadCases';

export default class data_table extends LightningElement {

    @track pagenumber = 1;
    @track recordstart = 0;
    @track recordend = 0;
    @track totalrecords = 0;
    @track pagesize = 3;
    @track totalpages = 1;
    @track showpagination=true;
    @track pagelist;
    @track isLoaded = false;
    @track caseData;
    @track caseColumns = [
    { label: 'Case Number', fieldName: 'CaseNumber', type: 'text'},
    { label: 'Subject', fieldName: 'Subject', type: 'text'},
    { label: 'Priority', fieldName: 'Priority', type: 'text'}
    ];

    @wire(loadCases, {
    pageNumber: "$pagenumber",
    pageSize: "$pagesize"
    })
    getCaseRecord(result){
        if (result.data) {
            this.caseData = result.data.caseList;
            this.totalrecords = result.data.totalRecords;
            this.recordstart = result.data.recordStart;
            this.recordend = result.data.recordEnd;
            this.totalpages = Math.ceil(this.totalrecords / this.pagesize);
            this.generatePageList(this.pagenumber, this.totalpages);

            this.isLoaded = false;
            if(this.totalpages==1){
                this.showpagination=false;
            }else{
            this.showpagination=true; 
            }
        }
    }


    renderedCallback(){
        this.template.querySelectorAll('.testcss').forEach((but) => {
            but.style.backgroundColor = this.pagenumber===parseInt(but.dataset.id,10) ? '#F47920' : 'white';
            but.style.color = this.pagenumber === parseInt(but.dataset.id, 10) ? 'white' : 'black';
        });
    }


    handleFirst(event) {
        this.isLoading = true;
        var pagenumber = 1;
        this.pagenumber = pagenumber;
    }

    processMe(event) {
        var checkpage = this.pagenumber;
        this.pagenumber = parseInt(event.target.name);
        if (this.pagenumber != checkpage) {
        this.isLoading = true;
        }
    }

    get disableFirst() {
        if (this.pagenumber == 1) {
        return true;
        }
        return false;
    }

    get disableNext() {
        if (
        this.pagenumber == this.totalpages ||
        this.pagenumber >= this.totalpages
        ) {
        return true;
        }
        return false;
    }

    handlePrevious(event) {
        this.isLoading = true;
        this.pagenumber--;
    }

    handleNext(event) {
        this.isLoading = true;
        this.pagenumber = this.pagenumber + 1;
    }

    handleLast(event) {
        this.isLoading = true;
        this.pagenumber = this.totalpages;
    }

    generatePageList = (pagenumber, totalpages) => {
        var pagenumber = parseInt(pagenumber);
        var pageList = [];
        var totalpages = this.totalpages;
        this.pagelist = [];
        if (totalpages > 1) {
            if (totalpages < 3) {
                if (pagenumber == 1) {
                    pageList.push(1, 2);
                }
                if (pagenumber == 2) {
                    pageList.push(1, 2);
                }
            } else {
                if (pagenumber + 1 < totalpages && pagenumber - 1 > 0) {
                    pageList.push(pagenumber - 1, pagenumber, pagenumber + 1);
                } else if (pagenumber == 1 && totalpages > 2) {
                    pageList.push(1, 2, 3);
                } else if (pagenumber + 1 == totalpages && pagenumber - 1 > 0) {
                    pageList.push(pagenumber - 1, pagenumber, pagenumber + 1);
                } else if (pagenumber == totalpages && pagenumber - 1 > 0) {
                    pageList.push(pagenumber - 2, pagenumber - 1, pagenumber);
                }
            }
        }
        this.pagelist = pageList;
    };

}