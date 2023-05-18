import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import attachGroupFileDocument from '@salesforce/apex/AccountFileAttachClass.attachGroupFileDocument';
export default class  TestFileUploadLWC extends NavigationMixin (LightningElement) {
    redirect = true;
    resetpage = false;
    recId;
    contentDocId;
    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        if(uploadedFiles.length > 1){
            alert("cannot upload more than 1 file!");
            return false;
        }
        else{
            let uploadedFileNames = '';
            for(let i = 0; i < uploadedFiles.length; i++) {
                uploadedFileNames += uploadedFiles[i].name  ;
                this.contentDocId  = uploadedFiles[i].documentId;
            }
                 
           
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message:  ' Files uploaded Successfully: '+ uploadedFileNames,
                    variant: 'success',
                }),
            );
        }
    }
    handleSuccess(event) {
        this.recId = event.detail.id;
        if(this.contentDocId != null){
            attachGroupFileDocument({  
            recId: this.recId,  
            contentDocId: this.contentDocId            
          }).then(msg => {  
                if (msg=='success') { 
                    console.log('file attached successfully');
                    this.dispatchEvent(  
                    new ShowToastEvent({  
                      title: 'Success',  
                      variant: 'success',  
                      message: 'Contact Successfully created',  
                    }),  
                  );  
                  this[NavigationMixin.Navigate]({  
                    type: 'standard__recordPage',  
                    attributes: {  
                      recordId: this.recId,  
                      objectApiName: 'Account',  
                      actionName: 'view'  
                    },  
                  });  
                }
                else{
                    console.log('error'+msg);
                }
            });
        }
       /* const even = new ShowToastEvent({
            title: 'Success!',
            message: 'Record created!',
            variant: 'success'
        });
        this.dispatchEvent(even);
        if(this.redirect == true){
            console.log('handleSuccess'+this.redirect);
            let creditnoteId = event.detail.id;
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId:creditnoteId,
                    objectApiName:'Account',
                    actionName:'view'
                }
            })
        }
        if(this.resetpage== true){
            this.handleReset();
        }*/
    }

    handleError(event){
        const evt = new ShowToastEvent({
            title: 'Error!',
            message: event.detail.detail,
            variant: 'error',
            mode:'dismissable'
        });
        this.dispatchEvent(evt);
    }

    saveAndNewClick() {
        this.redirect = false;
        this.template.querySelector('lightning-record-edit-form').submit(this.fields);
        this.resetpage = true;
    }
    
    handleReset() {
       const inputFields = this.template.querySelectorAll(
           'lightning-input-field'
       );
       if (inputFields) {
           inputFields.forEach(field => {
               field.reset();
           });
       }
    }
    
    handleCancel(event){
        var url = window.location.href; 
        var value = url.substr(0,url.lastIndexOf('/') + 1);
        window.history.back();
        return false;
    }
}