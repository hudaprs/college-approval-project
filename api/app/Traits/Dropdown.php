<?php

namespace App\Traits;

class Dropdown
{
    public function dropdownMap($data, $value, $label)
    {
        return collect($data)->map(function ($result) use ($value, $label) {
            return [
                'value' => $result[$value],
                'label' => $result[$label],
            ];
        });
    }
}
