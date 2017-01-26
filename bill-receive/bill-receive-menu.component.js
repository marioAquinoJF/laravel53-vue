window.billReceiveMenuComponent = Vue.extend({
    template: `
        <br/>
    <br/>
	<div>
            <span v-for="o in menus">
                <a class="btn btn-default" v-link="{name: o.routeName}">{{ o.name }}</a>&nbsp;&nbsp;
            </span>
     </div>
    <br/>
    <br/>
`,
    data: function () {
        return {
            menus: [
                {name: "Contas a Receber", routeName: 'bill-receive.list'},
                {name: "Criar Recebimento", routeName: 'bill-receive.create'}
            ],
        };
    }
});