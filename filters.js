Vue.filter('currency', function (number)
{
    return accounting.formatMoney(number, {
        symbol: "R$ ",
        decimal: ".",
        thousand: ",",
        precision: 2,
        format: "%s%v"
    });
});

var currency = Vue.filter('currency');

Vue.filter('billDone', function (value)
{

    return value == 1 ? "Paga" : "Não Paga";

});

var billDone = Vue.filter('billDone');