Ext.define('Stadtra.model.LogModel', {

	extend		: 'Ext.data.Model',
	
	idProperty	: 'id',
	
	fields		: [
		{name	: 'id',			type: 'int'},
		{name	: 'user',	    type: 'string'},
        {name	: 'operation',  type: 'string'},
        {name	: 'time',	    type: 'date', convert: convertTimestamp}
	]
});
