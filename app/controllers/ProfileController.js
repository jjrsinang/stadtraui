Ext.define('Stadtra.controllers.ProfileController', {
     extend: 'Ext.app.Controller',
     
     alias: 'controller.profilecontroller',
     
     views: [
          'homepage.Profile'
     ],
     
     init: function() {
          // view events to listen to
         this.control({
             'profile': {
                    activate: this.onActivate
             }
         });
     },

     onActivate: function() {
          if (Stadtra.app.userSession) {
               var form = Ext.ComponentQuery.query('profile')[0].down('form');
               form.getForm().setValues({
                    fName: Stadtra.app.userSession.data.user.fName,
                    mName: Stadtra.app.userSession.data.user.mName,
                    lName: Stadtra.app.userSession.data.user.lName,
                    role: Stadtra.app.userSession.data.user.role,
                    email: Stadtra.app.userSession.data.user.email,
               });
          }
     } 
 });