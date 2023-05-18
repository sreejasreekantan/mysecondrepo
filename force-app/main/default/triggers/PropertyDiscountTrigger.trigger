trigger PropertyDiscountTrigger on Cust_Property__c (before insert) {
 PropertyClass.ApplyPropDiscount(trigger.new);
}