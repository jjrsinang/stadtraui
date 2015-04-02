Ext.define('Stadtra.store.StudentStore', {
	extend	: 'Ext.data.Store',
    requires: [
        'Stadtra.model.StudentModel'
    ],
	autoLoad: false,
	pageSize: 10,
	model	: 'Stadtra.model.StudentModel',
	proxy	: {
		type	:	'rest',
		enablePaging : true,
        url: '/stadtra/ws/students',
		reader : {
			type			: 'json',
			rootProperty	: 'data',
			totalProperty	: 'recordCount',
			successProperty : 'success'
		}
	}
});