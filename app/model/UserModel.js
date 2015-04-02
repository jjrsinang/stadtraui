Ext.define('Stadtra.model.UserModel', {

	extend		: 'Ext.data.Model',
	
	idProperty	: 'id',
	
	fields		: [
		{name	: 'id',				type	: 'int'},
		{name	: 'loginId',		type	: 'string'},
        {name	: 'password',		type	: 'string'},
		{name	: 'fName',		    type	: 'string'},
		{name	: 'mName',		    type	: 'string'},
		{name	: 'lName',		    type	: 'string'},
		{name	: 'role',    	    type	: 'string'}
	],
    
    getFullName: function() {
        return this.getData().lName + ', ' + this.getData().fName + ' ' + this.getData().mName;
    }
});
