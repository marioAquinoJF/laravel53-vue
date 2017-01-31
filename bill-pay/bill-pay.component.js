
window.billPayComponent = Vue.extend({
    components: {
        'bill-pay-menu-component': billPayMenuComponent,
    },

    template: `
            <div class="container">	
	
                <h3>Contas a Pagar</h3>
                <h4>Total: {{ total | currency}}</h4>
                <bill-pay-menu-component></bill-pay-menu-component>
		<div class="alert"  :class="{'text-info': !status, 'text-danger': status, 'alert-info': !status, 'alert-danger': status}">
                    <p  >
                        <b>{{ message }}</b>
                    </p>

		</div>
                <div>
                    <router-view></router-view>
                </div>  
            </div>
            
                `,
    created: function ()
    {
        var self = this;
        self.updateStatus();
        self.updateTotal();
    },
    methods: {
        calcStatus: function (bills)
        {
            var count = 0;
            var self = this;
            for (var i in bills) {

                if (!bills[i].done) {
                    count++;
                }
            }

            self.status = count ? true : false;
            self.message = (!self.status ? 'Não há contas a pagar' : 'Há ' + count + ' contas a pagar');
        },
        updateStatus: function ()
        {
            var self = this;
            Bill.query({type:'toPay'})
                    .then(function (response)
                    {
                        self.calcStatus(response.data);

                    });
        },
        updateTotal: function ()
        {
            var self = this;
            Bill.total({type:'toPay'})
                    .then(function (response)
                    {
                        self.total = response.data.total;
                      
                    });
        }
    },
    data: function ()
    {
        return {
            title: 'Contas a pagar',
            status: false,
            message: '',
            total: 0
        };
    },
    events: {
        'change-info': function ()
        {
            this.updateStatus();
            this.updateTotal();
        }
    }
});

