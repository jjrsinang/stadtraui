Ext.define('Stadtra.view.homepage.MessageTable', {
    extend: 'Ext.grid.Panel',
    xtype: 'message-table',
	
	requires: [
		'Stadtra.model.MessageThreadModel'
	],
	
	title: 'Messages',
	emptyText: 'no messages to display',
	height: 200,
    width: 670,
	frame: true,
	collapsible: true,
	collapseFirst: false,
	
	tools: [
		{
			xtype: 'button',
			itemId: 'newMessageButton',
			text: '+',
			margin: '0 5 0 0'
		}
	],
	
	columns: [
        {
            text: 'Name',
            flex: 1,
            dataIndex: 'participant1Id',
			renderer: function(value, meta, record) {
				if (record.data.participant1Id == Stadtra.app.userSession.data.user.id) {
					value = record.data.participant2.lName + ', ' + record.data.participant2.fName + ' ' + record.data.participant2.mName;
					if (!record.data.seen1) {
						value = '<b>' + value + '</b>';
					}
				} else if (record.data.participant2Id == Stadtra.app.userSession.data.user.id) {
					value = record.data.participant1.lName + ', ' + record.data.participant1.fName + ' ' + record.data.participant1.mName;
					if (!record.data.seen2) {
						value = '<b>' + value + '</b>';
					}
				}
				
				return value;
			}
        }, {
			text: 'Role',
			flex: 1,
			dataIndex: 'participant1Id',
			renderer: function(value, meta, record) {
				if (record.data.participant1Id == Stadtra.app.userSession.data.user.id) {
					value = record.data.participant2.role;
					if (!record.data.seen1) {
						value = '<b>' + value + '</b>';
					}
				} else if (record.data.participant2Id == Stadtra.app.userSession.data.user.id) {
					value = record.data.participant1.role;
					if (!record.data.seen2) {
						value = '<b>' + value + '</b>';
					}
				}
				
				return value;
			}
			
		}, {
            text: 'Time',
            flex: 1,
            dataIndex: 'tstamp',
			renderer: function(value, meta, record) {
				if (record.data.participant1Id == Stadtra.app.userSession.data.user.id) {
					if (!record.data.seen1) {
						value = '<b>' + value + '</b>';
					}
				} else if (record.data.participant2Id == Stadtra.app.userSession.data.user.id) {
					if (!record.data.seen2) {
						value = '<b>' + value + '</b>';
					}
				}
				
				return value;
			}
        }
    ]
});