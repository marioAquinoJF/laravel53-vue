window.billReceiveListComponent = Vue.extend({
    template: `
	<table class='table table-responsive'>				
		<thead>
			<tr>
				<th>#</th>
				<th>Vencimento</th>
				<th>Nome</th>
				<th>Valor</th>
				<th>Status</th>
				<th>Ações</th>
				<th> Dar baixa</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for='(index,o) in bills'>
				<td>{{index}}</td>
				<td>{{o.date_due}}</td>
				<td>{{o.name}}</td>
				<td>{{ o.value | currency }}</td>
				<td class='my-class' :class="{'text-info':o.done, 'text-danger': !o.done}"><b>{{ o.done ? "Paga" : 'Não Paga' }}</b></td>
				<td>
					<span>
						<a v-link="{ name: 'bill-receive.update', params:{id:index} }">Editar</a> 
					</span>
                                        |
					<span>
						<a href="#" @click.prevent="delBill(index)">
							Apagar
						</a>
					</span>
				</td>							
				<td>
				<input type='checkbox' :checked="o.done" @change.prevent="changeState(o)"/>
				</td>
			</tr>
		</tbody>
	</table>
	`,
    data: function ()
    {
        return {
            bills: this.$root.$children[0].billsReceive
        };
    },
    methods: {
        delBill: function (index)
        {
            var r = confirm("Deseja excluir esta conta?");
            if (r == true) {
                this.$root.$children[0].billsReceive.splice(index, 1);                
            }

        },
        changeState: function (o)
        {
            o.done = !o.done;
        }
    }
});
