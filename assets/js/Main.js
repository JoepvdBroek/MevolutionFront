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
            [
                {
                    button: '.mv-zoom-yellow > a',
                    target: '.mv-yellow'
                }
            ]
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

            $(button.button).click(function()
           {
               $(button.target).click();
           });
        }
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