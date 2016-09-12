<?php

namespace App\Http\Controllers;

use Auth;
use Context;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
//        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('home');
    }

	public function dash()
	{
		$token = Context::user()->createToken("API")->accessToken;
		return view('dash')->with('token', $token);
    }
}
