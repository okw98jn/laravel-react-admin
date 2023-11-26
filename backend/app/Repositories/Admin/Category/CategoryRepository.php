<?php

namespace App\Repositories\Admin\Category;

use App\Repositories\CommonRepository;
use App\Models\Admin\Category;

class CategoryRepository extends CommonRepository implements CategoryRepositoryInterface 
{
    public function __construct(Category $category)
    {
        parent::__construct($category);
    }
    
}