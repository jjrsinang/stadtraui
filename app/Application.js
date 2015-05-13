/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('Stadtra.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Stadtra',
	
	models: [
		'Stadtra.model.UserSessionModel'
	],

    stores: [
        // TODO: add global / shared stores here
    ],
    
    controllers: [
        'Stadtra.controllers.LoginController',
		'Stadtra.controllers.AdviserController',
		'Stadtra.controllers.StudentController',
		'Stadtra.controllers.ProfileController',
		'Stadtra.controllers.AnnouncementController',
		'Stadtra.controllers.NotificationController'
    ],
	
	views: [
		'Stadtra.view.main.Main'
	],
    
    launch: function () {
		
		Ext.Ajax.defaultHeaders = {
			'Accept'	: 'application/json',
			'Content-Type': 'application/json'
		};
		
		// set request timeout to 60 seconds
		Ext.Ajax.setTimeout(90000); 
		Ext.override(Ext.form.Basic, { timeout: Ext.Ajax.timeout / 1000 });
		Ext.override(Ext.data.proxy.Server, { timeout: Ext.Ajax.timeout });
		Ext.override(Ext.data.Connection, { timeout: Ext.Ajax.timeout });
		Ext.override(Ext.data.proxy.Ajax, { timeout: 90000 });
		Ext.override(Ext.form.action.Action, { timeout: 90 });
		
		this.loadUserSession();
		
		// get reference to login cotroller to gain access to login/logout functions
		var loginController = this.getController('Stadtra.controllers.LoginController');
		
		if (!Ext.util.Cookies.get('stadtraLoggedIn') && Stadtra.app.userSession) {
			console.log('case 1: logged out from another tab');
			// if user logged out from another tab
			loginController.logout();
		} else if (Ext.util.Cookies.get('stadtraLoggedIn') && !Stadtra.app.userSession) {
			console.log('case 2: logged in from another tab');
			// if user logged in from another tab
			loginController.checkSession(function(fp, o){ // passed function is called as "onSuccess"
				var session = Ext.create('Stadtra.model.UserSessionModel',{
					user		: o.result.data.user,
					loginDate	: o.result.data.loginDate,
					userSessionId : o.result.data.userSessionId
				});
				session.save();
				window.location.reload();
			});
		} else {
			if (Stadtra.app.userSession) {
				// only load if someone is logged in
				loginController.checkSession(function(fp, o){ // passed function is called as "onSuccess"
					
					// if browser user session is not the one registered in back-end
					if (Stadtra.app.userSession.data.user.id != o.result.data.user.id) {
						console.log('case 3: someone logged in does not match backend');
						var session = Ext.create('Stadtra.model.UserSessionModel',{
							user		: o.result.data.user,
							loginDate	: o.result.data.loginDate,
							userSessionId : o.result.data.userSessionId
						});
						Stadtra.app.userSession.proxy.clear();
						Stadtra.app.userSession = null;
						session.save();
						window.location.reload();
					} else {
						console.log('case 4: someone logged in is legit');
						// create viewport to "start application"
						// will show home page
						Ext.create('Stadtra.view.main.Main').add({xtype: 'home-page'});
					}
				});
			} else {
				console.log('case 5: no one is looged in');
				// create viewport to "start application"
				// will show login page
				Ext.create('Stadtra.view.main.Main').add({xtype: 'main-container'});
			}
		}
    },
	
	loadUserSession: function() {
		// attempt to load user session, if any
		var store = Ext.create('Ext.data.Store',{
			model: 'Stadtra.model.UserSessionModel'
		});
		store.load();
		
		var i = 0;
		var id;
		store.each(function(item){
			++i;
			if (i == 1) {
				Stadtra.app.userSession = item;
				//id = item.getId();
				//Stadtra.model.UserSessionModel.load(id, {
				//	success: function(user) {
				//		Stadtra.app.userSession = user;
				//	}
				//});
			}
		});
	}
});
