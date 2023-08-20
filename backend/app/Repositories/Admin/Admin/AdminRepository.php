<?php

namespace App\Repositories\Admin\Admin;

use App\Repositories\CommonRepository;
use App\Models\Admin\Admin;

class AdminRepository extends CommonRepository implements AdminRepositoryInterface 
{
    public function __construct(Admin $admin)
    {
        parent::__construct($admin);
    }
    
}