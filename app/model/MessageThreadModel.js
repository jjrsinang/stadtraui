Ext.define('Stadtra.model.MessageThreadModel', {

	extend		: 'Ext.data.Model',
	
	idProperty	: 'id',
	
	fields		: [
		{name	: 'id',             type: 'int'},
		{name	: 'participant1Id', type: 'int'},
        {name	: 'participant2Id', type: 'int'},
        {name	: 'seen1',          type: 'boolean', allowNull: true},
        {name	: 'seen2',          type: 'boolean', allowNull: true},
        {name	: 'tstamp',         type: 'date', convert: convertTimestamp}
	]
});
