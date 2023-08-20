<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;

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
}