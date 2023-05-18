import { LightningElement, api } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
    export default class FileUploadLWC extends LightningElement {
       // @api recordId;
        get acceptedFormats() {
            return ['.pdf', '.png','.jpg','.jpeg'];
        }
        handleUploadFinished(event) {
            // Get the list of uploaded files
            const uploadedFiles = event.detail.files;
            let uploadedFileNames = '';
            for(let i = 0; i < uploadedFiles.length; i++) {
                uploadedFileNames += uploadedFiles[i].name  ;
                var documentId  = uploadedFiles[i].documentId;
            }
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message:  ' Files uploaded Successfully: '+documentId+'-'+ uploadedFileNames,
                    variant: 'success',
                }),
            );
        }
    }