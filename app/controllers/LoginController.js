Ext.define('Stadtra.controllers.LoginController', {
     extend: 'Ext.app.Controller',
     
     alias: 'controller.logincontroller',
     
     views: [
          'login.LogIn',
          'main.Main'
     ],
     
     init: function() {
          // view events to listen to
         this.control({
             'login-container form button': { // kjsfbgkdhzfbglfisu
                    click: this.onClickButton
             },
             'login-container form #userField': {
                    specialkey: this.onPressEnter
             },
             'login-container form #passwordField': {
                    specialkey: this.onPressEnter
             },
             'home-page #logoutButton': {
                    click: this.onClickLogout
             }
         });
     },
     
     test: function() {
          console.log('test');
     },

     onClickButton: function() {
          this.login();
     },
     
     onPressEnter: function(field, e) {
          if (e.getKey() == e.ENTER) {
               this.login();
          }
     },
     
     onClickLogout: function() {
          this.logout();
     },
     
     login: function() {console.log('called login');
          var url = window.location.href + 'ws/security/login';
          var form = Ext.ComponentQuery.query('login-container')[0].down('#loginForm');
          
          // if already logged in, reload browser tab to redirect to homepage
          if (Ext.util.Cookies.get('stadtraLoggedIn')) {
               window.alert('about to refresh');
               window.location.reload();
          }
          
          // submit form to backend for login
          if (form.isValid()) {
               form.submit({
                    url: url,
                    method: 'POST',
                    waitMsg: 'Logging in...',
                    success: function(fp, o) {console.log(o.result.data);
                         form.down('#errorText').hide();
                         // create a session
                         var session = Ext.create('Stadtra.model.UserSessionModel',{
                              user      : o.result.data.user,
                              loginDate : o.result.data.loginDate,
                              userSessionId : o.result.data.userSessionId,
                              remoteAddress : o.result.data.remoteAddress
                         });
                         
                         session.save();
                         Ext.util.Cookies.set('stadtraLoggedIn',o.result.data.userSessionId);
                         window.location.reload();
                    },
                    failure: function(fp, o) {
                         var msg = o.result.data.errorMessage;
                         form.down('#errorText').show();
                         form.down('#errorText').setValue(msg);
                    }
               });
          }
     },
     
     logout: function() {console.log('called logout');
          // this form is not appended as child to any container so it is not rendered
          var logoutForm = Ext.create('Ext.form.Panel',{
               jsonSubmit  : true
          });
          
          logoutForm.submit({
               url: window.location.href + 'ws/security/logout',
               method: 'POST',
               waitMsg: 'Loggin out...',
               success: function(fp, o) {
                   Stadtra.app.userSession.proxy.clear();
                   Stadtra.app.userSession = null;
                   Ext.util.Cookies.clear('stadtraLoggedIn');
                   window.location.reload();
               },
               failure: function(fp, o) {
                   Ext.Msg.alert('STADTRA', 'Logout failed');
               }
          });
     },
     
     checkSession: function(onSuccess) {console.log('called checkSession');
          // this form is not appended as child to any container so it is not rendered
          var loginForm = Ext.create('Ext.form.Panel',{
               jsonSubmit  : true
          });
          
          loginForm.submit({
               url: window.location.href + 'ws/security/session/authenticate?sessionId='+Ext.util.Cookies.get('stadtraLoggedIn'),
               method: 'GET',
               headers: {
                    'Accept'	: 'application/json',
                    'Content-Type': 'application/json'
               },
               success: function(fp, o) {
                    onSuccess(fp, o); // call the passed function on success
               },
               failure: function () {
                    Ext.util.Cookies.clear('stadtraLoggedIn');
                    window.location.reload();
               }
          });
     }
     
 });