<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(
            \App\Repositories\Admin\Admin\AdminRepositoryInterface::class,
            \App\Repositories\Admin\Admin\AdminRepository::class
        );
        $this->app->bind(
            \App\Repositories\Admin\Category\CategoryRepositoryInterface::class,
            \App\Repositories\Admin\Category\CategoryRepository::class
        );
    }
}