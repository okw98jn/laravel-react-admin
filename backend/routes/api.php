<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Admin\AdminController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('admin')->name('admin.')->group(function () {
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('admins', [AdminController::class, 'getAllAdmins'])->name('admins');
        Route::post('admin', [AdminController::class, 'storeAdmin'])->name('admin');
        Route::get('{id}', [AdminController::class, 'showAdmin'])->name('show_admin');
        Route::post('update/{id}', [AdminController::class, 'updateAdmin'])->name('update_admin');
        Route::post('login_id_duplicate_check', [AdminController::class, 'loginIdDuplicateCheck'])->name('login_id_duplicate_check');
        Route::post('password_check', [AdminController::class, 'passwordCheck'])->name('password_check');
        Route::post('delete', [AdminController::class, 'delete'])->name('delete');
    });
});
