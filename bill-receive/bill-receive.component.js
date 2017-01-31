window.billReceiveComponent = Vue.extend({

    components: {
        'bill-receive-menu-component': billReceiveMenuComponent
    },
    template: `
            <div class="container">	
	
                <h3>{{title}}</h3>
                <h4>Total: {{ total | currency}}</h4>
                <bill-receive-menu-component></bill-receive-menu-component>
		<div class="alert"  :class="{'text-info': !status, 'text-danger': status, 'alert-info': !status, 'alert-danger': status}">
                    <p  >
                        <b>{{ message }}</b>
                    </p>

		</div>
                <router-view></router-view>
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
            self.message = (!self.status ? 'Não há contas a receber' : 'Há ' + count + ' contas a receber');
        },
        updateStatus: function ()
        {
            var self = this;
            Bill.query({type:'toReceive'})
                    .then(function (response)
                    {
                        self.calcStatus(response.data);

                    });
        },
        updateTotal: function ()
        {
            var self = this;
            Bill.total({type:'toReceive'})
                    .then(function (response)
                    {
                        self.total = response.data.total;

                    });
        }
    },
    data: function ()
    {
        return {
            title: 'Contas a Receber',
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