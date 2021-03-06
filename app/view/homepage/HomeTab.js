Ext.define('Stadtra.view.homepage.HomeTab', {
    extend: 'Ext.panel.Panel',

    
    xtype: 'home-tab',
	title: 'Home',
	items: [{
		xtype: 'panel',
		fieldLabel: 'Home',
		x: 80,
		y:80,
		layout: {
			type: 'hbox'
		},
		items: [{
			xtype: 'panel',
			title: 'WELCOME',
			height: 500,
			width: 1100,
			bodyPadding: 30,
			border: 2,
			style: {
				borderColor: 'black',
				borderStyle: 'solid'
			
			},
				items: [
					{
						xtype: 'label',
						text: 'Welcome to STADTRA!',
						width: '100%',
						labelSeparator: ' '
					},
					{
						xtype: 'displayfield',
						fieldLabel: 'Hi!'
					}
				]
		}]
	}]
	
});
    