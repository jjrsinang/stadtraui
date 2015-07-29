Ext.define('Stadtra.model.MessageModel', {

	extend		: 'Ext.data.Model',
	
	idProperty	: 'id',
	
	fields		: [
		{name	: 'id',         type: 'int'},
		{name	: 'senderId',   type: 'int'},
        {name	: 'receiverId', type: 'int'},
        {name	: 'message',    type: 'string'},
        {name	: 'tstamp',	    type: 'date', convert: convertTimestamp},
        {name	: 'threadId',   type: 'int'}
	]
});
