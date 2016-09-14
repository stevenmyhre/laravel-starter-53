<?php namespace App\Http\Controllers\Api;

use App\DOMAIN\Models\User;
use Datatables;

class TodoController extends BaseApiController {
	public function all()
	{
		sleep(2);
		return [
			'test',
			'another',
			'again'
		];
	}

	public function all_datatables()
	{
		return Datatables::of(User::all())->make(true);
	}
}