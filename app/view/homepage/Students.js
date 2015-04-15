Ext.define('Stadtra.view.homepage.Students',{
	extend: 'Ext.panel.Panel',
	xtype: 'student-panel',
	
	requires: [
		'Stadtra.view.homepage.StudentTable'
	],
	
	title: 'Students',

	layout: 'center',
    
    autoScroll: true,

	items: [
		{
			xtype: 'student-table'
		}
	]
});

