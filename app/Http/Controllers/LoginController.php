<?php namespace App\Http\Controllers;

class LoginController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Show the canvas screen to the user.
     *
     * @return Response
     */
    public function getIndex()
    {
        return view('auth.login');
    }

}
