Ext.define('Stadtra.view.login.MainContainer', {
    extend: 'Ext.container.Container',
    requires: [
        'Stadtra.view.login.LoginContainer',
        'Stadtra.view.login.FooterContainer',
        'Stadtra.view.login.BannerContainer'
    ],
    
    xtype: 'main-container',
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'toolbar',
            style: {
                'background-color': '#157fcc'
            },
            height: 70,
            items: [
                {
                    xtype: 'image',
                    src: 'resources/images/ics.png',
                    width: 50,
                    height: 50
                },
                {
                    xtype: 'panel',
                    bodyStyle: 'background:#157fcc;',
                    width: 200,
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'label',
                            text: 'STADTRA',
                            padding: '10 0 0 0',
                            style: {
                                fontSize: '24px',
                                fontWeight: 'bold',
                                color: 'white'
                            }
                        },
                        {
                            xtype: 'label',
                            text: 'Student-Adviser Tracker',
                            style: {
                                color: 'white'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'login-container'
        },
        {
            xtype: 'footer-container'
        }

    ]
});
