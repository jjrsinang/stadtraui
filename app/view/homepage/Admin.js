Ext.define('Stadtra.view.homepage.Admin', {
    extend: 'Ext.panel.Panel',
    xtype: 'admin-container',
	
	requires: [
		'Stadtra.view.homepage.AdminTable',
		'Stadtra.view.homepage.AdminLogsTable'
	],
    
    title: 'Admin',

	layout: 'center',
    
    autoScroll: true,
    
    items: [
		{
			xtype: 'container',
			layout: 'form',
			width: 700,
			items: [
				{
					xtype: 'admin-table',
					title: 'Online users',
					padding: '0 0 20 0'
				},
				{
					xtype: 'admin-logs-table',
					title: 'Logs'
				}
			]
		}
	]
});