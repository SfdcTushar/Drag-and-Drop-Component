public with sharing class GetSpecificAccount {
    public GetSpecificAccount() {

    }
    @AuraEnabled
    public static List<Account> getAccount(string sActId) {
        return [SELECT Id, Name , SLAExpirationDate__c, Active__c from Account where id=:sActId];
    }
}