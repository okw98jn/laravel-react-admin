<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class CommonRepository
{
    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function getAll()
    {
        return $this->model->all();
    }

    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {
            return $this->model->create($data);
        });
    }

    public function update($id, array $data)
    {
        return DB::transaction(function () use ($id, $data) {
            return $this->model->find($id)->update($data);
        });
    }

    public function getOneById($id)
    {
        return $this->model->find($id);
    }
    
    public function dataExists(array $where)
    {
        return $this->model->where($where)->exists();
    }

    public function delete($id)
    {
        $this->model->find($id)->delete();
    }
}