import { LightningElement } from 'lwc';

export default class inputProgressBar extends LightningElement {
    
    progress(event){
        const custEvent = new CustomEvent(
            'callpasstoparent', {
                detail: event.target.value 
            });
        this.dispatchEvent(custEvent);
    }
}