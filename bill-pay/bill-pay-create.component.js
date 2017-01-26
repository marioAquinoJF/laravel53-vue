
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
		<input type='submit' value='Enviar'/>                    
	</form>	`,
    propsData: ['bill'],
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
                done: 0
            }

        };
    },
    created: function ()
    {
        if (this.$route.name === 'bill-pay.update') {
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit: function ()
        {
            if (this.$route.name == 'bill-pay.update') {
                this.$root.$children[0].billsPay[this.$route.params.id] = this.bill;
                
            } else {
                this.$root.$children[0].billsPay.push(this.bill);
            }
            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            };
            window.router.go({name: 'bill-pay.list'});
        },
        getBill: function (index)
        {
            var bills = this.$root.$children[0].billsPay;
            this.bill = bills[index];

        }
    }
});