Ext.define('Stadtra.view.login.Announcement', {
    extend: 'Ext.container.Container',

    
    xtype: 'announcement-container',
    
    layout: {
        type: 'hbox',
        align: 'middle',
        pack: 'center'        
    },

    items: [
    	{
    		xtype: 'panel',
    		title: 'ANNOUNCEMENTS',
    		height: 550,
    		width: 500,
    		padding: 50,
			bodyPadding: 10,
			html: 'no announcements at this time'
    	}
    ]
});
