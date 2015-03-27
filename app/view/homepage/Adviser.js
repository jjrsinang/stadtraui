Ext.define('Stadtra.view.homepage.Adviser',{
	extend: 'Ext.panel.Panel',
	
	xtype: 'adviser-list',
	
	title: 'Adviser',
    glyph: 85,
	
	
	
	items: [{
		title: 'Adviser List',
		width: 300,
		height: 300,
		//defaults: {
			// applied to each contained panel
		//	bodyStyle: 'padding:30px'
		//},
		layout: {
			// layout-specific configs go here
			type: 'accordion',
			titleCollapse: false,
			animate: true,
			activeOnTop: false
		},
		items: [{
			title: 'Panel 1',
			html: 'Panel content!'
		},{
			title: 'Panel 2',
			html: 'Panel content!'
		},{
			title: 'Panel 3',
			html: 'Panel content!'
		}],
    renderTo: Ext.getBody()
    }]
});