<!DOCTYPE html>
<html ng-app="app">
<head >
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Mevolution</title>

    <script src="dev/js/jquery-2.1.3.min.js"></script>
    <script src="dev/js/jquery-ui.js"></script>
    <script src="dev/js/bootstrap.min.js"></script>

    @if (env('APP_DEBUG') == true)

        <link rel="stylesheet" type="text/css" href="dev/css/lib.css" />
        <link rel="stylesheet" type="text/css" href="dev/css/general.css" />

        @yield('style-debug')

    @else

        <link rel="stylesheet" type="text/css" href="assets/css/lib.css" />
        <link rel="stylesheet" type="text/css" href="assets/css/general.css" />

        @yield('style-non-debug')

    @endif

    @yield('style')

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<div id="wrapper">
    <div id="navigation-wrapper" ng-controller="NavigationBarController">
        <div class="toggle-navigation" ng-click="toggle()">
            <i class="fa"></i>
        </div>
        <ul class="sidebar-nav">
            <li class="sidebar-brand">
                <a href="#">
                    <img class="big" src="assets/img/logo.jpg" alt="Mevolution" />
                    <img class="small" src="assets/img/logo-small.png" alt="M" />
                </a>
            </li>
            <li>
                <a href="dashboard.html"><i class="fa fa-dashboard"></i> Dashboard</a>
            </li>
            <li class="active">
                <a href="develpmentcircle.html"><i class="fa fa-pie-chart"></i> Ontwikkelruimte</a>
            </li>
            <li>
                <a href="canvas.html"><i class="fa fa-briefcase"></i> Portfolio</a>
            </li>
            <li>
                <a href="#"><i class="fa fa-list-alt"></i> Verzamelbak</a>
            </li>
            <li>
                <a href="#"><i class="fa fa-question"></i> Development Spiral</a>
            </li>
            <li>
                <a href="#"><i class="fa fa-support"></i> Over MeVOLUTION</a>
            </li>
        </ul>
        <div class="footer">
            &copy; MeVOLUTION 2015
        </div>
    </div>

    <ng-view>
        @yield('content')
    </ng-view>
</div>

@if (env('APP_DEBUG') == true)

    <script>var debug = true;</script>
    <script src="dev/js/libs.js"></script>
    <script src="dev/js/Application.js"></script>
    <script src="//{{ Request::server('SERVER_NAME') }}:4003/livereload.js"></script>

    @yield('script-debug')

@else

    <script>var debug = false;</script>
    <script src="assets/js/libs.min.js"></script>
    <script src="assets/js/Application.min.js"></script>
    @yield('script-non-debug')

@endif

@yield('script')

</body>
</html>