Ext.define('Stadtra.view.login.BannerContainer', {
    extend: 'Ext.container.Container',

    
    xtype: 'banner-container',

    style: {
        background: 'blue'
    },

    items: [
    {
        xtype: 'image',
        src: 'images/icon.png',
        width: 50,
        height: 50
    },
    {
        xtype: 'image',
        src: 'images/banner.png',
        width: 800,
        height: 50        
    },
    {
        xtype: 'image',
        src: 'images/icon.png',
        width: 50,
        height: 50
    }

    ]
});
