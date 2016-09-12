<?php  namespace App\DOMAIN\Facades;
use Illuminate\Support\Facades\Facade;

/**
 * User: Steven
 * Date: 6/16/14
 * Time: 9:38 PM
 */
class Context extends Facade {
	protected static function getFacadeAccessor() { return 'context'; }
}