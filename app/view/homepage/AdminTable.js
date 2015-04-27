Ext.define('Stadtra.view.homepage.AdminTable', {
    extend: 'Ext.grid.Panel',
    xtype: 'admin-table',
	
	maxHeight: 450,
    width : 570,
    columns: [
        {
            text: 'Name',
            width: 170,
            dataIndex: 'userName'
        }, {
            text: 'ID No',
            width: 110,
            dataIndex: 'loginId'
        }, {
            text: 'Duration',
            width: 85,
            dataIndex: 'durationInMinutes',
            renderer: function (value) {
                return value + ' min(s)';
            }
        }, {
            text: 'Remote Address',
            flex: 1,
            dataIndex: 'remoteAddress'
        }
    ],

    initComponent: function () {
        var me = this;

        me.store = Ext.create('Ext.data.Store',{
            model: 'Stadtra.model.UserSessionModel',
            pageSize: 100,
            proxy	: {
                type	:	'rest',
                enablePaging : true,
                url: '/stadtra/ws/security/sessions',
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