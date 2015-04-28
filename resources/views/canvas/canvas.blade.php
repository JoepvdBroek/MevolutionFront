@extends('template.admin')

@section('style-debug')

    <link rel="stylesheet" href="dev/css/spiral.css" type="text/css" />

@endsection

@section('style-non-debug')

    <link rel="stylesheet" href="assets/css/spiral.min.css" type="text/css" />

@endsection

@section('content')

<div class="container-fluid content mv-spiral zoomViewport">
    <div class="zoomContainer">
        <div class="row mv-row">
            <div class="col-xs-6 mv-spiral-section mv-yellow zoomTarget" data-targetsize="0.95" data-closeclick="true">

            </div>
            <div class="col-xs-6 mv-spiral-section mv-blue zoomTarget" data-targetsize="0.95" data-closeclick="true">

            </div>
        </div>
        <div class="row mv-row">
            <div class="col-xs-6 mv-spiral-section mv-red zoomTarget" data-targetsize="0.95" data-closeclick="true">

            </div>
            <div class="col-xs-6 mv-spiral-section mv-green zoomTarget" data-targetsize="0.95" data-closeclick="true">

            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-2 col-xs-offset-5 mv-toolbar unfolded">
            <div class="collapse-toolbar">
                <a href="#"><i class="fa"></i></a>
            </div>
            <ul>
                <li class="mv-add" data-toggle="tooltip" title='<i class="fa fa-question-circle"></i> Voeg item toe'>
                    <a href="#"><i class="fa fa-plus"></i></a>
                </li>
                <li class="mv-zoom-yellow" data-toggle="tooltip" title='<i class="fa fa-question-circle"></i> Zoom in naar het gele gedeelte'>
                    <a href="#"><i class="fa fa-square"></i></a>
                </li>
                <li class="mv-zoom-blue" data-toggle="tooltip" title='<i class="fa fa-question-circle"></i> Zoom in naar het blauwe gedeelte'>
                    <a href="#" class="zoomButton" data-root=".mv-spiral"><i class="fa fa-square"></i></a>
                </li>
                <li class="mv-zoom-red" data-toggle="tooltip" title='<i class="fa fa-question-circle"></i> Zoom in naar het rode gedeelte'>
                    <a href="#"><i class="fa fa-square"></i></a>
                </li>
                <li class="mv-zoom-green" data-toggle="tooltip" title='<i class="fa fa-question-circle"></i> Zoom in naar het groene gedeelte'>
                    <a href="#"><i class="fa fa-square"></i></a>
                </li>
                <li class="mv-help" data-toggle="tooltip" title='<i class="fa fa-question-circle"></i> Help'>
                    <a href="#"><i class="fa fa-question"></i></a>
                </li>
            </ul>
        </div>
    </div>
</div>

@endsection

@section('script-debug')

    <script src="/assets/js/lib/zoomooz/jquery.zoomooz.min.js"></script>
    <script src="/dev/js/Main.js"></script>

@endsection

@section('script-non-debug')

    <script src="/assets/js/lib/zoomooz/jquery.zoomooz.min.js"></script>
    <script src="/assets/js/Main.js"></script>

@endsection