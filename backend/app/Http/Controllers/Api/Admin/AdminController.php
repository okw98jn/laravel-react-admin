<?php

namespace App\Http\Controllers\Api\Admin;

use Exception;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Repositories\Admin\Admin\AdminRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    protected $adminRepository;

    public function __construct(AdminRepositoryInterface $adminRepository)
    {
        $this->adminRepository = $adminRepository;
    }

    public function getAllAdmins()
    {
        try {
            $admins = $this->adminRepository->getAll();
            return response()->json($admins, JsonResponse::HTTP_OK);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        } 
    }
}
