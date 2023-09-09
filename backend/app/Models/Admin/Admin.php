<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Admin extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'admins';

    protected $fillable = [
        'name',
        'login_id',
        'password',
        'status',
        'role',
    ];

    protected $dates = ['deleted_at'];
}
