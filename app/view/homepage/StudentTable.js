Ext.define('Stadtra.view.homepage.StudentTable', {
    extend: 'Ext.grid.Panel',
    xtype: 'student-table',
	
	requires: [
		'Stadtra.store.StudentStore',
		'Ext.toolbar.Paging',
        'Ext.ux.ProgressBarPager',
		'Ext.grid.filters.Filters'
	],

    plugins: [{
        ptype: 'gridfilters'
    }],
	
	maxHeight: 450,
    width : 650,
	frame: true,
    multiColumnSort: true,

    columns: [
		{
			text: 'Name',
			width: 200 ,
			dataIndex: 'lName',
			items    : {
				xtype: 'textfield',
				fieldLabel: 'Filter',
				emptyText: 'surname',
				itemId: 'studentNameFilterField',
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
			text: 'Student Number',
			width: 145,
			dataIndex: 'studentNo',
			items    : {
				xtype: 'textfield',
				fieldLabel: 'Filter',
				emptyText: 'xxxx-xxxxx',
				itemId: 'studentNoFilterField',
				flex : 1,
				labelWidth: 30,
				width: 125,
				padding: '0 0 0 10',
				enableKeyEvents: true
			}
		}, {
			text: 'Classification',
			width: 130,
			dataIndex: 'classification'
		}, {
			text: 'Email',
			flex: 1,
			dataIndex: 'email'
		}
	],

    initComponent: function () {
        var me = this;

        me.store = Ext.create('Stadtra.store.StudentStore');
		
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