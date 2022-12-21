<?php

namespace App\Constants;

class ProjectTransactionConstant
{
    public const PENDING = 'Pending';
    public const REVISE = 'Revise';
    public const REVISED = 'Revised';
    public const AGREEMENT_PROCESS = 'Agreement Process';
    public const INTERNAL_AGREEMENT_PROCESS = 'Internal Agreement Process';
    public const APPROVED = 'Approved';
    public const REJECTED = 'Rejected';

    public static function PROJECT_TRANSACTION_STATUS_LIST()
    {
        return [
            self::PENDING,
            self::REVISE,
            self::REVISED,
            self::AGREEMENT_PROCESS,
            self::INTERNAL_AGREEMENT_PROCESS,
            self::APPROVED,
            self::REJECTED,
        ];
    }

    public static function PROJECT_TRANSACTION_STATUS_ON_GOING()
    {
        return [
            self::AGREEMENT_PROCESS,
            self::REVISED,
            self::INTERNAL_AGREEMENT_PROCESS,
        ];
    }

    public static function PROJECT_TRANSACTION_STATUS_NOT_PROCESSED()
    {
        return [
            self::PENDING,
            self::REVISE,
        ];
    }
}