Ext.define('Stadtra.store.AnnouncementStore', {
	extend	: 'Ext.data.Store',
    requires: [
        'Stadtra.model.AnnouncementModel'
    ],
	autoLoad: false,
	pageSize: 10,
	model	: 'Stadtra.model.AnnouncementModel',
	remoteFilter: true,
	proxy	: {
		type	:	'rest',
		enablePaging : true,
        url: '/stadtra/ws/announcements',
		reader : {
			type			: 'json',
			rootProperty	: 'data',
			totalProperty	: 'recordCount',
			successProperty : 'success'
		}
	}
});