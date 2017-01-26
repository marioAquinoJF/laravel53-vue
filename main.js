
var mainComponent = Vue.extend({
    components: {
        'bill-component': billComponent
    },
    template: `<bill-component></bill-component>`,
    data: function ()
    {
        return {
            billsPay: [
                {date_due: '21/10/2017', name: 'Conta de luz', value: 1000, done: true, type: 'pay'},
                {date_due: '21/10/2017', name: 'Conta de água', value: 3500, done: false, type: 'pay'},
                {date_due: '21/10/2016', name: 'Conta de telefone', value: 3000, done: false, type: 'pay'},
                {date_due: '21/10/2016', name: 'Supermercado', value: 1000, done: false, type: 'pay'},
                {date_due: '21/10/2016', name: 'Cartão de crédito', value: 6200, done: false, type: 'pay'},
                {date_due: '21/10/2016', name: 'Gasolina', value: 1000, done: false, type: 'pay'}
            ],

            billsReceive: [
                {date_due: '28/10/2017', name: 'Salário', value: 1000, done: true, type: 'receive'},
                {date_due: '25/10/2017', name: 'Contrato', value: 6000, done: false, type: 'receive'},
                {date_due: '15/10/2016', name: 'Herança', value: 5000, done: false, type: 'receive'},
                {date_due: '19/10/2016', name: 'Empréstimo', value: 10000, done: false, type: 'receive'}
            ]};
    }
});


