Ext.define('Stadtra.view.homepage.AdviserTable', {
    extend: 'Ext.grid.Panel',
    xtype: 'teacher-table',
	
	requires: [
		'Stadtra.store.AdviserStore',
		'Ext.toolbar.Paging',
        'Ext.ux.ProgressBarPager',
		'Ext.grid.filters.Filters'
	],

    plugins: [{
        ptype: 'gridfilters'
    }],
	
	maxHeight: 450,
    width : 750,
    multiColumnSort: true,
	
	dockedItems: [
		{
			xtype: 'toolbar',
			items: [
				'->',
				{
				text:'Print',
				tooltip:'Print to PDF'
			}]
		}
	],

    columns: [
		{
			text: 'Name',
			width: 200 ,
			dataIndex: 'lName',
			items    : {
				xtype: 'textfield',
				fieldLabel: 'Filter',
				emptyText: 'surname',
				itemId: 'nameFilterField',
				flex : 1,
				labelWidth: 30,
				width: 180,
				padding: '0 0 10 10',
				enableKeyEvents: true
			},
			renderer: function(value, meta, record){
				return record.getFullName();
			}
		}, {
			text: 'Employee Number',
			width: 145,
			dataIndex: 'employeeNo',
			items    : {
				xtype: 'textfield',
				fieldLabel: 'Filter',
				emptyText: 'xxxxxxx',
				itemId: 'employeeNoFilterField',
				flex : 1,
				labelWidth: 30,
				width: 125,
				padding: '0 0 0 10',
				enableKeyEvents: true
			},
		}, {
			text: 'Advisees',
			width: 80,
			dataIndex: 'email',
			renderer: function(value, meta, record){
				return record.getData().students.length;
			}
		}, {
			text: 'Email',
			flex: 1,
			dataIndex: 'email'
		}, {
			text: 'Status',
			width: 100,
			dataIndex: 'status'
		}
	],

    initComponent: function () {
        var me = this;

        me.store = Ext.create('Stadtra.store.AdviserStore');
		
		Ext.apply(me, {
			bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: me.store,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
		});
		
		me.store.load();

        me.callParent();
    }
});