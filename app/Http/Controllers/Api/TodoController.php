<?php namespace App\Http\Controllers\Api;

class TodoController extends BaseApiController {
	public function all()
	{
		sleep(10);
		return [
			'test',
			'another',
			'again'
		];
	}
}