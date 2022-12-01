<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'created_by',
        'status',
        'reject_reason',
        'approved_date',
        'rejected_date',
        'active_project'
    ];

    protected $casts = [
        'active_project' => 'array'
    ];

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function users()
    {
        return $this
            ->belongsToMany(User::class, 'project_transaction_user', 'project_transaction_id')
            ->withPivot('reject_reason', 'approved_date', 'rejected_date')
            ->as('approval');
    }
}