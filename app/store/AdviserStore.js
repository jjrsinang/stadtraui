Ext.define('Stadtra.store.AdviserStore', {
	extend	: 'Ext.data.Store',
    requires: [
        'Stadtra.model.AdviserModel'
    ],
	autoLoad: false,
	pageSize: 10,
	model	: 'Stadtra.model.AdviserModel',
	remoteFilter: true,
	proxy	: {
		type	:	'rest',
		enablePaging : true,
        url: '/stadtra/ws/teachers',
		reader : {
			type			: 'json',
			rootProperty	: 'data',
			totalProperty	: 'recordCount',
			successProperty : 'success'
		}
	}
});