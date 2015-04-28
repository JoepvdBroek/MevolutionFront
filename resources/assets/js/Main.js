var Mevolution =
{
    settings:
    {
        navigation:
        {
            toggler: '#navigation-wrapper .toggle-navigation',
            target: '#wrapper',
            toggleClass: 'unfolded'
        },
        toolbar:
        {
            toggler: '.mv-toolbar .collapse-toolbar',
            target: '.mv-toolbar',
            toggleClass: 'unfolded',
            zoomButtons:
            [{
                button: '.mv-zoom-yellow > a',
                target: '.mv-yellow'
            },
            {
                button: '.mv-zoom-blue > a',
                target: '.mv-blue'
            },
            {
                button: '.mv-zoom-red > a',
                target: '.mv-red'
            },
            {
                button: '.mv-zoom-green > a',
                target: '.mv-green'
            }]
        }
    },

    _settings: null,

    load: function(settings)
    {
        this._settings = settings;

        this.toolbar();
        this.navigation();
    },

    toolbar: function()
    {
        $('.mv-toolbar [data-toggle="tooltip"]').tooltip
        ({
             html: true,
             delay:
             {
                 show: 1000,
                 hide: 0
             }
         });

        $(this._settings.toolbar.toggler).click(angular.bind(this, function()
        {
            $(this._settings.toolbar.target).toggleClass(this._settings.toolbar.toggleClass);
        }));

        for (var key in this._settings.toolbar.zoomButtons)
        {
            var button = this._settings.toolbar.zoomButtons[key];

            this.bindZoomButtonClick(button);
        }
    },

    bindZoomButtonClick: function(button)
    {
        $(button.button).click(function()
        {
            setTimeout(function()
            {
                $(button.target).trigger('click');

            }, 0);
        });
    },

    navigation: function()
    {
        $(this._settings.navigation.toggler).click(angular.bind(this, function()
        {
            $(this._settings.navigation.target).toggleClass(this._settings.navigation.toggleClass);
        }));
    }
};

$(function()
{
    Mevolution.load(Mevolution.settings);
});