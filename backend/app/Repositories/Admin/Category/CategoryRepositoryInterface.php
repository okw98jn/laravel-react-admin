<?php

namespace App\Repositories\Admin\Category;

interface CategoryRepositoryInterface
{
    public function getAll();

    public function searchData(array $searchKeywords);
    
    public function create(array $data);

    public function update($id, array $data);

    public function getOneById($id);

    public function dataExists(array $where);

    public function delete($id);
}
