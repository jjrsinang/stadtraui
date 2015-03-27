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
             'login-container form button': {
                    click: this.onClickButton
             },
             'login-container form #userField': {
                    specialkey: this.onPressEnter
             },
             'login-container form #passwordField': {
                    specialkey: this.onPressEnter
             }
         });
     },

     onClickButton: function() {
          // get reference to login view
          var loginView = Ext.ComponentQuery.query('login-container')[0];
          
          // perform action if valid
          if (loginView.down('form').isValid()) {
               var mainView = Ext.ComponentQuery.query('#viewport')[0];
               mainView.getLayout().setActiveItem(1);
          } else {
               loginView.down('#errorText').setHidden(false);
               loginView.down('#errorText').setValue('Login error');
          }
     },
     
     onPressEnter: function(field, e) {
          if (e.getKey() == e.ENTER) {
               this.onClickButton();
          }
     }
 });