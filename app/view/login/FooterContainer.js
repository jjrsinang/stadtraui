Ext.define('Stadtra.view.login.FooterContainer', {
    extend: 'Ext.container.Container',
    
    xtype: 'footer-container',

    layout: {
        type: 'hbox',
        align: 'stretch',
        pack: 'center'
    },

    defaults: {
        xtype: 'label',
        padding: 10
    },

    items: [
        {
            text: '© 2015, Stadtra'
        },
        {
            text: 'Terms of Use'
        },
        {
            text: 'Privacy Policy'
        },
        {
            text: 'Contact Us'
        },
        {
            text: 'About'
        }
    ]
});
