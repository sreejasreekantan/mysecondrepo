import { LightningElement } from 'lwc';

export default class NewComponent extends LightningElement {
    changeletter(event){
        var letter=event.target.value;
        alert("you entered letter"+letter);

    }
}