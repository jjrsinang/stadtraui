Ext.define('Stadtra.view.homepage.HomePage', {
    extend: 'Ext.tab.Panel',
	requires:[
		'Stadtra.view.homepage.homeTab',
		'Stadtra.view.homepage.Adviser',
		'Stadtra.view.homepage.Profile',
		'Stadtra.view.homepage.Students'
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

	tools: [
		{ 
			type: 'gear',
			tooltip: 'Options',
			handler: function(){
				
			}
		}
	],
	items: [{
		xtype: 'home-tab'
		
    }, {
		xtype: 'profile'
    }, {
		xtype: 'adviser-list'
    }, {
    	xtype: 'student-panel'
    }, {
        title: 'Logout',
        glyph: 42
    }]
	
    
});
