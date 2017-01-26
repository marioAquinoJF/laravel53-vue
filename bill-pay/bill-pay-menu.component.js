window.billPayMenuComponent = Vue.extend({
    template: `
        <br/>
    <br/>
	<div>
            <span v-for="o in billPayMenu">
                <a class="btn btn-default" v-link="{name: o.routeName}">{{ o.title }}</a>&nbsp;&nbsp;
            </span>
        </div>
    <br/>
    <br/>
            `,
    data: function ()
    {
        return {
            billPayMenu: [
                { title: 'Lista de Contas', routeName: 'bill-pay.list'},
                { title: 'Nova Conta',  routeName: 'bill-pay.create'}
            ]};
    }
});
