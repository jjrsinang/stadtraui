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
    
    title: {
            xtype: 'toolbar',
            style: {
                'background-color': '#157fcc'
            },
            height: 37,
			padding: '1 1 1 1',
            items: [
                {
                    xtype: 'image',
                    src: 'resources/images/logo.png',
                    width: 40,
                    height: 40
                },
                {
                    xtype: 'panel',
                    bodyStyle: 'background:#157fcc;',
                    width: 141,
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'label',
                            text: 'STADTRA',
                            padding: '2 0 0 0',
                            style: {
                                fontSize: '22px',
                                fontWeight: 'bold',
                                color: 'white'
                            }
                        },
                        {
                            xtype: 'label',
                            text: 'Student-Adviser Tracker',
                            style: {
                                color: 'white'
                            }
                        }
                    ]
                },
				{
                    xtype: 'image',
                    src: 'resources/images/logo2.png',
                    width: 40,
                    height: 40
                }
            ]
        },
	//ui: 'navigation',
	tabPosition: 'left',
	width: 400,
    height: 400,
	
	tabRotation: 0,
	
	items: [
	{
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
					text: '0',
					itemId: 'notifButton',
					width: 25
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
					padding: '0 5 0 5'
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
