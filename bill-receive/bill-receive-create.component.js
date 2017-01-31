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
                Paga: <input type='checkbox' :checked="bill.done"  v-model='bill.done'/>
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
                type: 'toReceive'
            }
        };
    },
    created: function ()
    {
        var self = this;
        if (self.$route.name === 'bill-receive.update') {
            self.getBill(self.$route.params.id);
        }
    },
    methods: {
        submit: function ()
        {
            var self = this;
            if (this.$route.name == 'bill-receive.update') {
                Bill.update({type: 'toReceive', id: self.bill.id}, self.bill)
                        .then(function (response)
                        {

                            self.$dispatch('change-info');
                            window.router.go({name: 'bill-receive.list'});
                        });
            } else {
                Bill.save({}, self.bill)
                        .then(function (response)
                        {
                            self.$dispatch('change-info');
                            window.router.go({name: 'bill-receive.list'});
                        });

            }

        },
        getBill: function (id)
        {
            var self = this;
            Bill.get({type: 'toReceive', id: id})
                    .then(function (response)
                    {
                        self.bill = response.data;
                    });

        }

    }
});