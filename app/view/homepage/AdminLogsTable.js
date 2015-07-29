Ext.define('Stadtra.view.homepage.AdminLogsTable', {
    extend: 'Ext.grid.Panel',
    xtype: 'admin-logs-table',
	
	requires: [
		'Stadtra.model.LogModel'
	],
	
	maxHeight: 450,
    width : 570,
	frame: true,
	
    columns: [
        {
            text: 'User',
            flex: 1,
            dataIndex: 'user'
        }, {
            text: 'Operation',
            flex: 1,
            dataIndex: 'operation'
        }, {
            text: 'Time',
            flex: 1,
            dataIndex: 'time'
        }
    ],

    initComponent: function () {
        var me = this;

        me.store = Ext.create('Ext.data.Store',{
            model: 'Stadtra.model.LogModel',
            pageSize: 10,
            proxy	: {
                type	:	'rest',
                enablePaging : true,
                url: '/stadtra/ws/security/logs',
                reader : {
                    type			: 'json',
                    rootProperty	: 'data',
                    totalProperty	: 'recordCount',
                    successProperty : 'success'
                }
            }
        });
		
		Ext.apply(me, {
			bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 100,
                store: me.store,
                displayInfo: true
            }
		});
		
		me.store.load();

        me.callParent();
    }
});