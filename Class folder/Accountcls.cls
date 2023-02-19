public with sharing class Accountcls {
    public Accountcls() {

    }
    @AuraEnabled (cacheable=true)
    public static List<Account> getAccountList(){
        return[SELECT Id, Name,Type,Industry,AnnualRevenue
                FROM Account];
    }
}