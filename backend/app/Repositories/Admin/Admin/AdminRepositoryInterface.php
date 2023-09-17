<?php

namespace App\Repositories\Admin\Admin;

interface AdminRepositoryInterface
{
    public function getAll();
    
    public function create(array $data);

    public function dataExists(array $where);
}
