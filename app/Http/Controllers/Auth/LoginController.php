<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Context;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Input;
use Session;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/dashboard';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest', ['except' => 'logout']);
    }

	public function redirectPath()
	{
		if(Input::has('intended_hash') && Input::get('intended_hash')[0] == '#') {
			Session::flash('_hash', Input::get('intended_hash'));
		}
		if (property_exists($this, 'redirectPath')) {
			return $this->redirectPath;
		}
		if(property_exists($this, 'redirectTo'))
			return $this->redirectTo;
		return Context::redirectToUserPage()->getTargetUrl();
    }
}
