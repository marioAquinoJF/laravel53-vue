
window.billPayCreateComponent = Vue.extend({

    template: `
	<form name="form" @submit.prevent="submit">
		<label>Vencimento</label>
		<input type='text' v-model='bill.date_due' />
		<br/>

		<br/>
		<label>Nome</label>
		<select v-model='bill.name'>
			<option v-for='o in names' :value="o">{{o}}</option>
		</select>
		<br/>
		<label>Valor</label>
		<input type='text'  v-model='bill.value'/> 
                <br/><br/>
                Paga: <input type='checkbox' :checked="bill.done"  v-model='bill.done'/>
		<br/><br/>
		<input type='submit' value='Enviar'/>  
	</form>	`,
    data: function ()
    {
        return {
            names: [
                'Conta de luz',
                'Conta de água',
                'Conta de telefone',
                'Supermercado',
                'Cartão de crédito',
                'Gasolina'
            ],
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: 0,
                type: 'toPay'
            }

        };
    },
    created: function ()
    {
        var self = this;
        if (self.$route.name === 'bill-pay.update') {
            self.getBill(self.$route.params.id);
        }
    },
    methods: {
        submit: function ()
        {
             var self = this;
            if (self.$route.name == 'bill-pay.update') {
                Bill.update({type:'toPay',id: self.bill.id}, self.bill)
                        .then(function (response)
                        {

                            self.$dispatch('change-info');
                            window.router.go({name: 'bill-pay.list'});
                        });
            } else {
               Bill.save({}, self.bill)
                        .then(function (response)
                        {

                            self.$dispatch('change-info');
                            window.router.go({name: 'bill-pay.list'});
                        });
            }
        },
        getBill: function (id)
        {
             var self = this;
            Bill.get({type:'toPay',id: id})
                    .then(function (response)
                    {
                        self.bill = response.data;
                    });

        }
    }
});