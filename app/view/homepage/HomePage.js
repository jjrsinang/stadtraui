Ext.define('Stadtra.view.homepage.HomePage', {
    extend: 'Ext.tab.Panel',
	requires:[
		'Stadtra.view.homepage.HomeTab',
		'Stadtra.view.homepage.Advisers',
		'Stadtra.view.homepage.Profile',
		'Stadtra.view.homepage.Students',
		'Stadtra.view.homepage.Admin',
		'Stadtra.view.login.Announcement'
	],

    
    xtype: 'home-page',
    
	layout:{
		type: 'absolute'
	},
    
    title: 'STADTRA',
	//ui: 'navigation',
	tabPosition: 'left',
	width: 400,
    height: 400,
	
	tabRotation: 0,
	
	items: [{
		xtype: 'announcement-container'
	},{
		xtype: 'profile'
    }, {
		xtype: 'teacher-panel'
    }, {
    	xtype: 'student-panel'
    }, {
		xtype: 'admin-container'
	}],
	
    initComponent: function() {
		var me = this;
		
		Ext.apply(me,{
			tools: [
				{ 
					xtype: 'button',
					text: 'Notification(s): 0',
					itemId: 'notifButton'
				},			
				{
					xtype: 'label',
					text: Stadtra.app.userSession ?
						Stadtra.app.userSession.data.user.lName +
						', ' +
						Stadtra.app.userSession.data.user.fName +
						' ' +
						Stadtra.app.userSession.data.user.mName
						: '',
					style: {
						color: 'white'
					},
					padding: '0 15 0 0'
				},
				{ 
					xtype: 'button',
					text: 'Logout',
					itemId: 'logoutButton'
				}
			],
		});
		
		me.callParent();
	}
});
