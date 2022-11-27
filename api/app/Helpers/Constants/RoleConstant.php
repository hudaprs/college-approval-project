<?php

namespace App\Helpers\Constants;

class RoleConstant
{
    public const CLIENT = 'Client';
    public const MARKETING = 'Marketing';
    public const CFO = 'CFO';
    public const CEO = 'CEO';
    public const CTO = 'CTO';
    public const ADMIN = 'Admin';

    public $roleList = [
        self::CLIENT,
        self::MARKETING,
        self::CFO,
        self::CEO,
        self::CTO,
        self::ADMIN
    ];
}
