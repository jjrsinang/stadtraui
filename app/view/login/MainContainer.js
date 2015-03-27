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
            height: 70,
            items: [
            {
                xtype: 'image',
                src: 'images/icon.png',
                width: 50,
                height: 50
            },
            {
                xtype: 'panel',
                width: 200,
                layout: 'vbox',
                items: [
                {
                    xtype: 'label',
                    text: 'STADTRA',
                    style: {
                        fontSize: '24px',
                    }
                },
                {
                    xtype: 'label',
                    text: 'Student-Adviser Tracker',
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
