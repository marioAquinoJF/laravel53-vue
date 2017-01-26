window.billReceiveComponent = Vue.extend({

    components: {
        'bill-receive-menu-component': billReceiveMenuComponent
    },
    template: `
            <div class="container">	
	
                <h3>{{title}}</h3>
                <bill-receive-menu-component></bill-receive-menu-component>
		<div class="alert" :class="{'text-danger': status > 0, 'text-info': status == 0, 'alert-info': status == 0, 'alert-danger': status > 0}" >
                    <p>
                      <b>  {{ statusBills }} </b>
                    </p>
                </div>
                <router-view></router-view>
             </div>

    `,
    data: function ()
    {
        return {
            title: "Contas a receber",            
            status: true,
        }
    },
    computed: {
        statusBills: function ()
        {
            var bills = this.$root.$children[0].billsReceive;
         
            var count = 0;

            for (var i in bills) {

                if (!bills[i].done) {
                    count++;
                }
            }
            this.status = count ? true : false;
            return count === 0 ? 'Não há contas a receber' : 'Há ' + count + ' contas a receber';
        }
    }
});