Ext.define('Stadtra.view.homepage.Admin', {
    extend: 'Ext.panel.Panel',
    xtype: 'admin-container',
	
	requires: [
		'Stadtra.view.homepage.AdminTable'
	],
    
    title: 'Admin',

	layout: 'center',
    
    autoScroll: true,
    
    items: [
		{
			xtype: 'admin-table'
		}
	]
});