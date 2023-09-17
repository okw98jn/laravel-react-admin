<?php

namespace App\Http\Controllers\Api\Admin;

use Exception;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Repositories\Admin\Admin\AdminRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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

    public function storeAdmin(Request $request)
    {
        try {
            $attributes             = $request->only(['name', 'login_id', 'password', 'role', 'status']);
            $attributes['password'] = Hash::make($request->input('password'));
            $admin                  = $this->adminRepository->create($attributes);
            return response()->json($admin, JsonResponse::HTTP_OK);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function loginIdDuplicateCheck(Request $request)
    {
        try {
            $where = [
                ['login_id', $request->login_id]
            ];
            $loginIdExists = $this->adminRepository->dataExists($where);
            return response()->json($loginIdExists, JsonResponse::HTTP_OK);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
