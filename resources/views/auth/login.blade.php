@extends('template.base')

@section('content')

<form class="form-horizontal" role="form" ng-controller="AuthenticationController">
    <div class="form-group">
        <label for="inputUsername" class="col-sm-4 control-label">Username</label>
        <div class="col-sm-4">
            <input type="text" class="form-control" id="inputUsername" placeholder="Username" ng-model="user.username">
        </div>
    </div>
    <div class="form-group">
        <label for="inputPassword" class="col-sm-4 control-label">Password</label>
        <div class="col-sm-4">
            <input type="password" class="form-control" id="inputPassword" placeholder="Password" ng-model="user.password">
        </div>
    </div>
    <div class="form-group">
        <div class="col-sm-offset-4 col-sm-10">
            <button type="submit" class="btn btn-default" ng-click="signIn(user.username, user.password)">Sign In</button>
        </div>
    </div>
</form>

@endsection