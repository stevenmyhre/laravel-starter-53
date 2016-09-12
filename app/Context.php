<?php namespace App;

use App\DOMAIN\Models\User;
use Auth;
use Illuminate\Http\RedirectResponse;

class Context {

    public function __construct()
    {

    }

    public function user()
    {
        return Auth::user();
    }

    public function redirectToUserPage()
    {
//        if(!Session::has('_hash')) {
//            $u = $this->user();
//            if ($u->isAdmin()) {
//                Session::flash('_hash', '#/user-list');
//            }
//        }
        return new RedirectResponse(url($this->userHome()));
    }

	public function userHome()
	{
		return '/';
    }
}
