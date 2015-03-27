Ext.define('Stadtra.view.login.FooterContainer', {
    extend: 'Ext.container.Container',
    
    xtype: 'footer-container',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    defaults: {
        padding: 10
    },

    items: [
    {
        xtype: 'button',
        text: '© 2015, Stadtra'
    },
    {
        xtype: 'button',
        text: 'Terms of Use'
    },
    {
        xtype: 'button',
        text: 'Privacy Policy'
    },
    {
        xtype: 'button',
        text: 'Contact Us'
    },
    {
        xtype: 'button',
        text: 'About'
    }
    ]
});
