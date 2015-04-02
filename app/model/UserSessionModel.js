
function convertTimestamp(value, record){
      if(value==null || value.length==0)return null;
      value = Ext.Date.format(new Date(value), 'm/d/Y H:i:s');
      if (value == '01/01/1970 00:00:00') {
           value = null;
      }
      return value;
 };
 
Ext.define('Stadtra.model.UserSessionModel',{
    extend : 'Ext.data.Model',
    
    fields  : [
        {name: 'loginDate',     type: 'date', convert: convertTimestamp},
        {name: 'user'},
        {name: 'durationInMinutes', type: 'int'},
        {name: 'userSessionId',      type: 'string'},
        
        // for display only
        {name: 'loginId',          type: 'string', persist:false},
        {name: 'userName',          type: 'string', persist:false},
        {name: 'remoteAddress',      type: 'string', persist:false},
        // used for logging out multiple users (IPC)
		{name: 'selected',			type	: 'bool',	defaultValue: false,	persist: false},
		{name: 'selectedUsers',		defaultValue: []}
    ],
    
    proxy : {
        type: 'sessionstorage',
        id : 'stadtraUserSession',
        model : 'Stadtra.model.UserSessionModel'
    },
    
    hasOne  : {model: 'Stadtra.model.UserModel', name: 'user' }
});