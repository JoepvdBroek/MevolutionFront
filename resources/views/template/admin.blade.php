<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Mevolution</title>

    @if (env('APP_DEBUG') == true)

        <link rel="stylesheet" type="text/css" href="dev/css/lib.css" />

        @yield('style-debug')

    @else

        <link rel="stylesheet" type="text/css" href="assets/css/lib.css" />

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
    <div id="navigation-wrapper">
        <div class="toggle-navigation">
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

    @yield('content')
</div>

@if (env('APP_DEBUG') == true)

    <script src="/dev/js/jquery-bootstrap-angular.js"></script>
    <script src="//{{ Request::server('SERVER_NAME') }}:4003/livereload.js"></script>

    @yield('script-debug')

@else

    <script src="/assets/js/jquery-bootstrap-angular.min.js"></script>

    @yield('script-non-debug')

@endif

@yield('script')

</body>
</html>