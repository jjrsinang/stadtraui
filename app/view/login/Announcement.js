Ext.define('Stadtra.view.login.Announcement', {
    extend: 'Ext.container.Container',

    
    xtype: 'announcement-container',
    
    layout: {
        type: 'vbox',
        align: 'middle',
        pack: 'center'        
    },
	
	title: 'Announcements',
	
	style: {
        background: '#F5F5F5'
    },
	
    items: [
    	{
    		xtype: 'panel',
			itemId: 'announcementPanel',
    		height: 550,
    		width: 600,
    		padding: 50,
			layout: 'card',
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'bottom',
				items: [
					{
						xtype: 'slider',
						flex: 1,
						increment: 1,
						minValue: 0,
						maxValue: 0,
						value: 0,
						readOnly: true
					}
				]
			}]
    	}
    ],
	
	listeners: {
		afterrender: function(container) {
			if (container.up('home-page') && Stadtra.app.userSession && Stadtra.app.userSession.data.user.role=='admin') {
				var button = Ext.create('Ext.button.Button',{
					text: 'Add',
					itemId: 'addAnnouncement'
				});
				container.insert(0, button);
			} else {
				container.down('#announcementPanel').setTitle('Announcements');
			}
		}
	}
});
