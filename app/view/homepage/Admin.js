Ext.define('Stadtra.view.homepage.Admin', {
    extend: 'Ext.panel.Panel',
    xtype: 'admin-container',
    
	requires: [
		'Ext.toolbar.Paging',
        'Ext.ux.ProgressBarPager',
		'Ext.grid.filters.Filters'
	],
    
    title: 'Admin',

	layout: 'center',
    
    autoScroll: true,
    
    items: [
		{
			xtype: 'grid',
			maxHeight: 450,
			width : 450,
			columns: [
				{
					text: 'Name',
					flex: 1,
					dataIndex: 'lName'
				}, {
					text: 'Duration',
					flex: 1,
					dataIndex: 'studentNo'
				}, {
					text: 'Remote Address',
					flex: 1,
					dataIndex: 'classification',
				}
			]
		}
	]
});