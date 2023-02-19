import { LightningElement,track,wire } from 'lwc';
import GetSpecificAccount from '@salesforce/apex/GetSpecificAccount.getAccount';
import { NavigationMixin } from 'lightning/navigation';

const actions = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
];
export default class DropLWCComponent extends NavigationMixin(LightningElement)   {

    @track message = 'Drop an Account here';
    wiredAccountsResult;
    @track accountId;
    @track showDataTable = false;
    @track columns = [{
        label: 'Account name',
        fieldName: 'Name',
        type: 'text',
        sortable: true
    },
    {
        label: 'SLA Expiration',
        fieldName: 'SLAExpirationDate__c',
        type: 'date',
        sortable: true
    },
    {
        label: 'Active',
        fieldName: 'Active__c',
        type: 'text',
        sortable: true
        },
        {
            type: 'action',
            typeAttributes: { rowActions: actions },
        }

];
@track error;
@track data ;
    
    dropElement(event){
        this.accountId = event.dataTransfer.getData("account_id");
        this.message = '';
        
        GetSpecificAccount({ sActId: this.accountId })
            .then(result => {
                this.data = result;
                this.error = undefined;
                this.showDataTable = true;
                //this.wiredAccountsResult = data;
               
            }
            )
            .catch(error => {
                this.error = error;
                this.data = undefined;
            });
           // return refreshApex(this.wiredAccountsResult);
    }
    allowDrop(event){
        event.preventDefault();
    }
    handleRowAction(event) {

        const actionName = event.detail.action.name;
       const row = event.detail.row;
        switch (actionName) {
            case 'view':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        actionName: 'view'
                    }
                });
                
                break;
            case 'edit':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: this.accountId,
                        objectApiName: 'Account',
                        actionName: 'edit'
                    }
                });
                break;
            default:
        }
    }
}