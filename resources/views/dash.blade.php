@extends('layouts.app')

@section('content')

    <div growl></div>
    <div ui-view class="dash" autoscroll="$root.autoScroll" data-ng-class="{loading: $root.loading}"></div>

@endsection

@section('scripts_footer')
    <script type="text/javascript">
        !function(){"use strict";function r(r,e){return e=e||Error,function(){var n,t,o=arguments[0],i="["+(r?r+":":"")+o+"] ",u=arguments[1],a=arguments;for(n=i+u.replace(/\{\d+\}/g,function(r){var e=+r.slice(1,-1);return e+2<a.length?toDebugString(a[e+2]):r}),n=n+"\nhttp://errors.angularjs.org/1.3.11/"+(r?r+"/":"")+o,t=2;t<arguments.length;t++)n=n+(2==t?"?":"&")+"p"+(t-2)+"="+encodeURIComponent(toDebugString(arguments[t]));return new e(n)}}function e(e){function n(r,e,n){return r[e]||(r[e]=n())}var t=r("$injector"),o=r("ng"),i=n(e,"angular",Object);return i.$$minErr=i.$$minErr||r,n(i,"module",function(){var r={};return function(e,i,u){var a=function(r,e){if("hasOwnProperty"===r)throw o("badname","hasOwnProperty is not a valid {0} name",e)};return a(e,"module"),i&&r.hasOwnProperty(e)&&(r[e]=null),n(r,e,function(){function r(r,e,t,o){return o||(o=n),function(){return o[t||"push"]([r,e,arguments]),c}}if(!i)throw t("nomod","Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.",e);var n=[],o=[],a=[],s=r("$injector","invoke","push",o),c={_invokeQueue:n,_configBlocks:o,_runBlocks:a,requires:i,name:e,provider:r("$provide","provider"),factory:r("$provide","factory"),service:r("$provide","service"),value:r("$provide","value"),constant:r("$provide","constant","unshift"),animation:r("$animateProvider","register"),filter:r("$filterProvider","register"),controller:r("$controllerProvider","register"),directive:r("$compileProvider","directive"),config:s,run:function(r){return a.push(r),this}};return u&&s(u),c})}})}e(window)}(window),angular.Module;

        !function(a,b,c){function t(a,c){var e=b.createElement("script"),f=j;e.onload=e.onerror=e[o]=function(){e[m]&&!/^c|loade/.test(e[m])||f||(e.onload=e[o]=null,f=1,c())},e.async=1,e.src=a,d.insertBefore(e,d.firstChild)}function q(a,b){p(a,function(a){return!b(a)})}var d=b.getElementsByTagName("head")[0],e={},f={},g={},h={},i="string",j=!1,k="push",l="DOMContentLoaded",m="readyState",n="addEventListener",o="onreadystatechange",p=function(a,b){for(var c=0,d=a.length;c<d;++c)if(!b(a[c]))return j;return 1};!b[m]&&b[n]&&(b[n](l,function r(){b.removeEventListener(l,r,j),b[m]="complete"},j),b[m]="loading");var s=function(a,b,d){function o(){if(!--m){e[l]=1,j&&j();for(var a in g)p(a.split("|"),n)&&!q(g[a],n)&&(g[a]=[])}}function n(a){return a.call?a():e[a]}a=a[k]?a:[a];var i=b&&b.call,j=i?b:d,l=i?a.join(""):b,m=a.length;c(function(){q(a,function(a){h[a]?(l&&(f[l]=1),o()):(h[a]=1,l&&(f[l]=1),t(s.path?s.path+a+".js":a,o))})},0);return s};s.get=t,s.ready=function(a,b,c){a=a[k]?a:[a];var d=[];!q(a,function(a){e[a]||d[k](a)})&&p(a,function(a){return e[a]})?b():!function(a){g[a]=g[a]||[],g[a][k](b),c&&c(d)}(a.join("|"));return s};var u=a.$script;s.noConflict=function(){a.$script=u;return this},typeof module!="undefined"&&module.exports?module.exports=s:a.$script=s}(this,document,setTimeout)

        // load all of the dependencies asynchronously.
        $script([
            '{{ build_asset('dashboard_app.js') }}',
        ], function() {
            // when all is done, execute bootstrap angular application
            angular.bootstrap(document, ['dashboard']);
            var intended = '<?php echo str_replace("&amp;", "&", htmlentities(Session::get('_hash'), ENT_QUOTES | ENT_HTML401 )) ?>';
            if(intended) {
                window.location = intended;
            }
        });

        var jwt_token = '{{ $token }}';

    </script>
@append