Ext.define('Stadtra.model.UserModel', {

	extend		: 'Ext.data.Model',
	
	idProperty	: 'id',
	
	fields		: [
		{name	: 'id',				type: 'int'},
		{name	: 'loginId',		type: 'string'},
        {name	: 'password',		type: 'string'},
		{name	: 'fName',		    type: 'string'},
		{name	: 'mName',		    type: 'string'},
		{name	: 'lName',		    type: 'string'},
		{name	: 'role',    	    type: 'string'},
        {name   : 'teacher'},
        {name   : 'student'}
        
	],
    
    associations: [{
		type	: 'hasOne',
		model	: 'Stadtra.model.AdviserModel',
		name	: 'teacher',
		associationKey: 'teacher'
	},{
		type	: 'hasOne',
		model	: 'Stadtra.model.StudentModel',
		name	: 'student',
		associationKey: 'student'
	}],
    
    getFullName: function() {
        return this.getData().lName + ', ' + this.getData().fName + ' ' + this.getData().mName;
    }
});
