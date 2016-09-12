<?php


if (!function_exists('build_asset')) {
    /**
     * Get the path to a versioned Elixir file.
     *
     * @param  string  $file
     * @return string
     */
    function build_asset($file)
    {
        static $manifest = null;

        if (is_null($manifest)) {
            if(file_exists(base_path().'/rev-manifest.json')) {
                $manifest = json_decode(file_get_contents(base_path() . '/rev-manifest.json'), true);
            } else {
                $manifest = [];
            }
        }

        $basename = basename($file);

        if (isset($manifest[$basename]) && file_exists(public_path(). '/build/'.$manifest[$basename])) {
            return '/build/'.$manifest[$basename];
        }

        $ext = pathinfo($file)['extension'];

        $basename = basename($file, "." . $ext) . '.min.' . $ext;

        if (isset($manifest[$basename]) && file_exists(public_path(). '/build/'.$manifest[$basename])) {
            return '/build/'.$manifest[$basename];
        }

        if(getenv('APP_ENV') == 'local') {
            if ($ext == 'js') {
                if(file_exists(public_path() . '/build/' . $file))
                    return '/build/' . $file;
                if(file_exists(public_path() . '/js/' . $file))
                    return '/js/' . $file;
            }
            if ($ext == 'css') {
                if(file_exists(public_path() . '/build/' . $file))
                    return '/build/' . $file;
                if(file_exists(public_path() . '/css/' . $file))
                    return '/css/' . $file;
            }
        }


        throw new InvalidArgumentException("File {$file} not found in asset manifest.");
    }
}