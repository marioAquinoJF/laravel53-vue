window.billPayListComponent = Vue.extend({
    template: `
	<table class='table table-reposnive'>				
		<thead>
			<tr>
				<th>#</th>
				<th>Vencimento</th>
				<th>Nome</th>
				<th>Valor</th>
				<th>Status</th>
				<th>Ações</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for='(index, o) in bills'>
				<td>{{o.id}}</td>
				<td>{{o.date_due}}</td>
				<td>{{o.name}}</td>
				<td>{{ o.value | currency }}</td>
				<td class='my-class' :class="{'text-info':o.done, 'text-danger': !o.done}"><b>{{ o.done | billDone }}</b></td>
				<td>
					<span>
						<a v-link="{ name: 'bill-pay.update', params:{id:o.id} }">Editar</a> 
					</span>
                                        |
					<span>
						<a href="#" @click.prevent="delBill(o)">
							Apagar
						</a>
					</span>
				</td>							
				
			</tr>
		</tbody>
	</table>
	`,
    data: function ()
    {
        return {
            bills: []
        };
    },
    created: function ()
    {
        var self = this;
        Bill.query({type:'toPay'})
                .then(function (response)
                {
                    self.bills = response.data;

                });
    },
    methods: {
        delBill: function (bill)
        {
            var self = this;
            var r = confirm("Deseja excluir esta conta?");
            if (r == true) {
                
                Bill.delete({id:bill.id})
                        .then(function (response)
                        {
                            self.bills.$remove(bill);
                            self.$dispatch('change-info');
                        })
            }

        }
    }
});
