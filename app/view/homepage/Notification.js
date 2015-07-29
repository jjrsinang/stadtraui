Ext.define('Stadtra.view.homepage.Notification', {
    extend: 'Ext.panel.Panel',
    xtype: 'notification-container',
	
	requires: [
		'Stadtra.view.homepage.NotificationTable',
		'Stadtra.view.homepage.MessageTable'
	],
    
    title: 'Notification',

	layout: 'center',
    
    autoScroll: true,
	
	items: [
		{
			xtype: 'container',
			itemId: 'container',
			layout: 'form',
			width: 700
		}
	],
	
	listeners: {
		afterrender: function(me) {
			var controller = Stadtra.app.getController("Stadtra.controllers.NotificationController");
			
			if (Stadtra.app.userSession && Stadtra.app.userSession.data.user.role != 'admin') {
				var store = controller.notifStore;
				me.down('#container').add({
					xtype: 'notification-table',
					store: store,
					bbar: {
						xtype: 'pagingtoolbar',
						pageSize: 100,
						store: store,
						displayInfo: true,
						plugins: new Ext.ux.ProgressBarPager()
					}
			   });
			}
			
			var messageStore = controller.messageStore;
			me.down('#container').add({
				xtype: 'message-table',
				margin: '25 0 0 0',
				store: messageStore,
				bbar: {
					xtype: 'pagingtoolbar',
					pageSize: 100,
					store: messageStore,
					displayInfo: true,
					plugins: new Ext.ux.ProgressBarPager()
				}
			});
		}
	}
});