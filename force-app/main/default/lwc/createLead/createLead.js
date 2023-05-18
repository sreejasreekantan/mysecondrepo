import { api,track,LightningElement, wire } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {getRecord, getFieldValue  } from 'lightning/uiRecordApi';
import HOSPITALFIELDNAME from '@salesforce/schema/Account.Name';
const fields=HOSPITALFIELDNAME ;
export default class CreateLead extends LightningElement {
    companyVal  ='';
    lookupId    ='';
    @wire(getRecord, { recordId: '$lookupId', fields })
    account;
    get accountName(){
        return getFieldValue(this.account.data,HOSPITALFIELDNAME);
    }
    handleChange(event){
        this.lookupId    = event.detail.value[0];
        console.log('selected hospital'+this.lookupId);
      
    }

    handleSuccess(event){
        const evt = new ShowToastEvent({
            title: 'Success',
            message: 'Lead created successfully',
            variant: 'success'
            
        });
        this.dispatchEvent(evt);
    }

    handleSubmit(event){
        var allFields  =event.detail.fields;
        //var hosp    = allFields.Hospital__c;
       // var compname    = getFieldDisplayValue(allFields,HOSPITALFIELDNAME);
        //var compname= allFields.Hospital__c.Name;
        //console.log('selected hospital 111'+allFields.Hospital__c.Name);
        //console.log('selected hospital'+compname);
        console.log('submit data'+ JSON.stringify(event.detail.fields));
        //event.preventDefault();
    }
}