window.dashboardComponent = Vue.extend({
    template: `
<div class="container">
    <h1>{{title}}</h1>
    <div class="row">
        <div class="col-lg-6">
        <h2>Contas a pagar</h2>
        <table class="table table-bordered">
            <tr>
                <th>Total de contas</th>
                <th>Valor total das contas</th>
                <th>Valor Pago</th>
                <th>Total a pagar</th>
            </tr>
            <tr>
                <td>{{ resume.billsPay.total }}</td>
                <td>{{ resume.billsPay.paidValue + resume.billsPay.nonPaidValue | currency }}</td>
                <td>{{ resume.billsPay.paidValue | currency }}</td>
                <td>{{ resume.billsPay.nonPaidValue | currency }}</td>
            </tr>
        </table>
        </div>
    
        <div class="col-lg-6">
            <h2>Contas a Receber</h2>
            <table class="table table-bordered">
                <tr>
                    <th>Total de contas</th>
                    <th>Valor total das contas</th>
                    <th>Valor Recebido</th>
                    <th>Total a receber</th>
                </tr>
                <tr>
                    <td>{{ resume.billsReceive.total }}</td>
                    <td>{{ resume.billsReceive.paidValue + resume.billsReceive.nonPaidValue | currency }}</td>
                    <td>{{ resume.billsReceive.paidValue | currency }}</td>
                    <td>{{ resume.billsReceive.nonPaidValue | currency }}</td>
                </tr>
            </table>
        </div>

    </div>
    <div class="row">
        <div class="col-lg-6">
            <h2>Balanço</h2>
            <table class="table table-bordered">
                <tr>
                    <th>Valor Total Recebido</th>
                    <th>Valor Total Pago</th>
                    <th>Total</th>
                </tr>
                <tr>
                    <td>{{ resume.billsReceive.paidValue | currency }}</td>
                    <td>{{ resume.billsPay.paidValue | currency }}</td>
                    <td>{{ resume.billsReceive.paidValue - resume.billsPay.paidValue  | currency }}</td>
                </tr>
            </table>
        </div>
        <div class="col-lg-6">
            <h2>Balanço</h2>
            <table class="table table-bordered">
                <tr>
                    <th>Valor Total a Receber</th>
                    <th>Valor Total a Pagar</th>
                    <th>Total</th>
                </tr>
                <tr>
                    <td>{{ resume.billsReceive.nonPaidValue | currency }}</td>
                    <td>{{ resume.billsPay.nonPaidValue | currency }}</td>
                    <td>{{ resume.billsReceive.nonPaidValue - resume.billsPay.nonPaidValue  | currency }}</td>
                </tr>
            </table>
        </div>
    </div>
</div>
`,
    components: {
        'bill-component': billComponent
    },
    created: function(){
        this.getBills();
    },
    data: function () {
        return {
            title: "Resumo",
            billsPay: null,
            billsReceive: null,
        }
    },
    methods:{
        getBills: function(){
            var self = this;
            Bill.query({type:'toPay'})
                      .then(function (response)
                      {
                          self.billsPay = response.data;

                      }); 
            Bill.query({type:'toReceive'})
                  .then(function (response)
                  {
                     self.billsReceive = response.data;
                  });
        },
        getResume : function () {
            var billsPay = this.billsSum( this.billsPay, true);
            var billsPayTotal = this.billsTotal( this.billsPay);
            var billsReceive = this.billsSum( this.billsReceive, true);
            var billsReceiveTotal = this.billsTotal( this.billsReceive);
            var resume = {
              billsPay:{
                  total: billsPayTotal.total,
                  paidBills: billsPay.total,
                  nonPaidBills: billsPayTotal.total - billsPay.total,
                  paidValue: billsPay.sum,
                  nonPaidValue: billsPayTotal.sum - billsPay.sum      
              },
              billsReceive:{
                  total: billsReceiveTotal.total,
                  paidBills: billsReceive.total,
                  nonPaidBills: billsReceiveTotal.total - billsReceive.total,
                  paidValue: billsReceive.sum,
                  nonPaidValue: billsReceiveTotal.sum - billsReceive.sum      
              } 
            };
            return resume;
        },
        billsSum: function(bills, done){
            var sum = 0;
            var total = 0;
            for(var i in bills){
                if(bills[i].done === done){
                    sum += parseFloat(bills[i].value);
                    total++;
                }
            }
            return {sum:sum, total:total};
        },
        billsTotal: function(bills){
            var sum = 0;
            var total =  bills.length;
            for(var i in bills){
                sum += parseFloat(bills[i].value);
            }
            return {sum:sum, total:total};
        }
        
    },
    computed: {
        resume: function () {
            return this.getResume();
        }
    }
});