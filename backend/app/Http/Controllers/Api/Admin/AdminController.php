<?php

namespace App\Http\Controllers\Api\Admin;

use Exception;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Repositories\Admin\Admin\AdminRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    protected $adminRepository;

    public function __construct(AdminRepositoryInterface $adminRepository)
    {
        $this->adminRepository = $adminRepository;
    }

    private function errorResponse($e)
    {
        Log::error($e->getMessage());
        return response()->json([$e->getMessage()], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function getAllAdmins()
    {
        try {
            $admins = $this->adminRepository->getAll();
            return response()->json($admins, JsonResponse::HTTP_OK);
        } catch (Exception $e) {
            return $this->errorResponse($e);
        }
    }

    public function search(Request $request)
    {
        try {
            $searchKeywords = $request->only(['name', 'login_id', 'role', 'status']);
            $admins         = $this->adminRepository->searchData($searchKeywords);
            return response()->json($admins, JsonResponse::HTTP_OK);
        } catch (Exception $e) {
            return $this->errorResponse($e);
        }
    }

    public function storeAdmin(Request $request)
    {
        try {
            $attributes             = $request->only(['name', 'login_id', 'password', 'role', 'status']);
            $attributes['password'] = Hash::make($request->input('password'));
            $admin                  = $this->adminRepository->create($attributes);
            return response()->json(['id' => $admin->id], JsonResponse::HTTP_OK);
        } catch (Exception $e) {
            return $this->errorResponse($e);
        }
    }

    public function showAdmin($id)
    {
        try {
            $admin = $this->adminRepository->getOneById($id);
            unset($admin['password']);
            if (empty($admin)) {
                return response()->json([], JsonResponse::HTTP_NOT_FOUND);
            }
            return response()->json($admin, JsonResponse::HTTP_OK);
        } catch (Exception $e) {
            return $this->errorResponse($e);
        }
    }

    public function updateAdmin(Request $request, $id)
    {
        try {
            $attributes = $request->only(['name', 'login_id', 'role', 'status']);
            if ($request->password) {
                $attributes['password'] = Hash::make($request->input('password'));
            }
            $this->adminRepository->update($id, $attributes);
            return response()->json($request, JsonResponse::HTTP_OK);
        } catch (Exception $e) {
            return $this->errorResponse($e);
        }
    }

    public function loginIdDuplicateCheck(Request $request)
    {
        try {
            $where = [
                ['login_id', $request->login_id]
            ];
            if (!empty($request->id)) {
                $where[] = ['id', '!=', $request->id];
            }
            $loginIdExists = $this->adminRepository->dataExists($where);
            return response()->json($loginIdExists, JsonResponse::HTTP_OK);
        } catch (Exception $e) {
            return $this->errorResponse($e);
        }
    }

    public function passwordCheck(Request $request)
    {
        try {
            $admin              = $this->adminRepository->getOneById($request->id);
            $isPasswordMatching = password_verify($request->oldPassword, $admin->password);
            return response()->json($isPasswordMatching, JsonResponse::HTTP_OK);
        } catch (Exception $e) {
            return $this->errorResponse($e);
        }
    }

    public function delete(Request $request)
    {
        try {
            $this->adminRepository->delete($request->id);
            return response()->json([], JsonResponse::HTTP_OK);
        } catch (Exception $e) {
            return $this->errorResponse($e);
        }
    }
}
