Ext.define('Stadtra.view.homepage.Advisers',{
	extend: 'Ext.panel.Panel',
	
	requires: [
		'Stadtra.view.homepage.AdviserTable'
	],
	
	xtype: 'teacher-panel',
	
	title: 'Advisers',
	items: [
		{
			xtype: 'teacher-table'
		}
		//{
		//	xtype: 'image',
		//	fieldLabel: 'Image Here',
		//	src: 'images/luffy.jpg',
		//	width: 200,
		//	height: 200
		//},
		//{
		//	xtype: 'button',
		//	text: 'Click me',
		//	renderTo: Ext.getBody(),
		//	handler: function() {
		//		alert('Gumagana na camae! hahaha!');
		//	}
		//},
		//{
		//	xtype: 'button',
		//	text: 'Dont click me! xD',
		//	renderTo: Ext.getBody(),
		//	handler: function() {
		//		document.location.href = 'http://sencha.com/'
		//	}
		//},
		//{
		//	xtype: 'button',
		//	text: 'Eto naman...',
		//	renderTo: Ext.getBody(),
		//	handler: function() {
		//		document.location.href = 'http://localhost:8080/docs/index.html'
		//	}
		//}
	]
});