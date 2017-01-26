window.billReceiveCreateComponent = Vue.extend({
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

    data: function ()
    {
        return {
            names: ['Salário', 'Contrato'],
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false,
            }
        };
    },
    created: function ()
    {
        if (this.$route.name == 'bill-receive.update') {
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit: function ()
        {
            if (this.$route.name == 'bill-receive.update') {
                this.$root.$children[0].billsReceive[this.$route.params.id] = this.bill;
                
            } else {
               this.$root.$children[0].billsReceive.push(this.bill);
            }
            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            };
            window.router.go({name: 'bill-receive.list'});
        },
        getBill: function (index)
        {
            var bills = this.$root.$children[0].billsReceive;
            this.bill = bills[index];

        }

    },
    events: {
        'change-receive': function (receive)
        {
            this.receive = receive;
        }
    }
});