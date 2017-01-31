Vue.http.options.root = 'http://192.168.10.10:8000/api';
window.Bill = Vue.resource('bills{/type}{/id}',{},{
    total: {method: 'GET', url:'bills{/type}/total'}
});