<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ProjectTransactionUser extends Pivot
{
    protected $table = "project_transaction_user";

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function project_transaction()
    {
        return $this->belongsTo(ProjectTransaction::class, 'project_transaction_id', 'id');
    }
}

