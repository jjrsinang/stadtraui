Ext.define('Stadtra.view.homepage.MessagePanel',{
	extend: 'Ext.form.Panel',
	
	xtype: 'message-panel',
	
	items: [
		{
			xtype: 'displayfield',
			name: 'name',
			renderer: function (value) {
				return '<b>' + value + '</b>';
			}
		},
		{
			xtype: 'displayfield',
			name: 'tstamp',
			margin: '-15 0 -5 0',
			
		},
		{
			xtype: 'textarea',
			name: 'message',
			width: 400,
			readOnly: true
		}
	]
});