<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'budget',
        'documents',
        'description',
        'start_date',
        'end_date'
    ];

    protected $casts = [
        'documents' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function project_transactions()
    {
        return $this->hasMany(ProjectTransaction::class, 'project_id', 'id');
    }
}
