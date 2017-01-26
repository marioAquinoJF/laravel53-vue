
window.billPayComponent = Vue.extend({
    components: {
        'bill-pay-menu-component': billPayMenuComponent,
    },
    
    template: `
            <div class="container">	
	
                <h3>Contas a Pagar</h3>
                <bill-pay-menu-component></bill-pay-menu-component>
		<div class="alert"  :class="{'text-info': !status, 'text-danger': status, 'alert-info': !status, 'alert-danger': status}">
                    <p  >
                        <b>{{ statusBills }}</b>
                    </p>

		</div>
                <div>
                    <router-view></router-view>
                </div>  
            </div>
            
                `,
    data: function ()
    {
        return {
            title: 'Contas a pagar',
            status: true,
            activedView: 0,
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            }
        };
    },
    computed: {
        statusBills: function ()
        {
            var bills = this.$root.$children[0].billsPay;
            var billListComponent = this.$refs.billListComponent;
           
            var count = 0;
            
            for (var i in bills) {
               
                if (!bills[i].done) {
                    count++;
                }
            }

            this.status = count ? true : false;
            return count === 0 ? 'Não há contas a pagar' : 'Há ' + count + ' contas a pagar';
        }
    }
});

