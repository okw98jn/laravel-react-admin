<?php

namespace App\Repositories\Admin\Admin;

interface AdminRepositoryInterface
{
    public function getAll();
    
    public function create(array $data);

    public function update($id, array $data);

    public function getOneById($id);

    public function dataExists(array $where);

    public function delete($id);
}
