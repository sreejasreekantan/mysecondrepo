trigger TrigParkerPenObject on Parken_Pen__c (before insert) {
ParkerPenClass.FuncParkerPenDiscCalc(Trigger.new);
}