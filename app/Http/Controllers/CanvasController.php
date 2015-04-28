<?php namespace App\Http\Controllers;

class CanvasController extends Controller
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
		return view('canvas.canvas');
	}

}
