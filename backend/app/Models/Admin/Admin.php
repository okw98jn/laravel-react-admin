<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use \Illuminate\Foundation\Auth\User as Authenticatable;


class Admin extends Authenticatable
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

    protected $hidden = [
        'password',
        'updated_at',
        'deleted_at',
    ];

    protected $dates = ['deleted_at'];
}
