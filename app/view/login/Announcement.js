Ext.define('Stadtra.view.login.Announcement', {
    extend: 'Ext.container.Container',

    
    xtype: 'announcement-container',
    
    layout: {
        type: 'vbox',
        align: 'middle',
        pack: 'center'        
    },
	
	title: 'Announcements',

    items: [
    	{
    		xtype: 'panel',
			itemId: 'announcementPanel',
    		height: 550,
    		width: 500,
    		padding: 50,
			bodyPadding: 10,
			html: 'no announcements at this time',
			layout: 'accordion'
    	}
    ],
	
	listeners: {
		afterrender: function(container) {
			if (container.up('home-page')) {
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
