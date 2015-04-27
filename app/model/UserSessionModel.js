
function convertTimestamp(value, record){
      if(!value)return '';
      return Ext.Date.format(new Date(value), 'm/d/Y H:i A');
 };
 
Ext.define('Stadtra.model.UserSessionModel',{
    extend : 'Ext.data.Model',
    
    fields  : [
        {name: 'loginDate',         type: 'date', convert: convertTimestamp},
        {name: 'user'},
        {name: 'durationInMinutes', type: 'int'},
        {name: 'userSessionId',     type: 'string'},
        {name: 'remoteAddress',     type: 'string'}
    ],
    
    proxy : {
        type: 'sessionstorage',
        id : 'stadtraUserSession',
        model : 'Stadtra.model.UserSessionModel'
    },
    
    hasOne  : {model: 'Stadtra.model.UserModel', name: 'user' }
});