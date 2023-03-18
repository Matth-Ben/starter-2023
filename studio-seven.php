<?php

/**
 * Display svg function
 */
function display_svg($svg, $getUrl = false) {
    $uri = $getUrl ? get_template_directory_uri() . "/resources/images/svg" : get_template_directory() . "/resources/images/svg";
    $path = "$uri/$svg.svg";
  
    if ($getUrl) return $path;
    else if (file_exists($path)) include($path);
    else throw new Exception("SVG name doesn't exist in /images/svg folder", 1);
}