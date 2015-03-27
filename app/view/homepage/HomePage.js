Ext.define('Stadtra.view.homepage.HomePage', {
    extend: 'Ext.tab.Panel',
	
	requires: [
		'Stadtra.view.homepage.Advisers',
		'Stadtra.view.homepage.Students'
	],
    
    xtype: 'home-page',
    
    layout: {
        type: 'auto'
    },
    
    title: 'STADTRA',
	tabPosition: 'left',
	width: 400,
    height: 400,
	
	tools: [
		{ 
			type: 'gear',
			tooltip: 'Options',
			handler: function(){
				
			}
		}
	],
	
    items: [
    	{
    		xtype: 'teacher-panel'
    		
    	},
    	{
    		xtype: 'student-panel'
    	}
    ]
});
