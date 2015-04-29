Ext.define('Stadtra.model.AnnouncementModel', {

	extend		: 'Ext.data.Model',
	
	idProperty	: 'id',
	
	fields		: [
		{name	: 'id',			type: 'int'},
		{name	: 'title',		type: 'string'},
        {name	: 'body',		type: 'string'},
		{name	: 'file',		type: 'string'}
        
	]
});
