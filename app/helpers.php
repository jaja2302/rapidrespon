<?php

if (!function_exists('can_edit')) {
    function can_edit()
    {
        if (in_array(auth()->user()->id_jabatan, ['15'])) {
            return true;
        } else {
            return false;
        }
    }
}

if (!function_exists('can_approve')) {
    function can_approve()
    {
        if (in_array(auth()->user()->id_jabatan, ['15'])) {
            return true;
        } else {
            return false;
        }
    }
}
