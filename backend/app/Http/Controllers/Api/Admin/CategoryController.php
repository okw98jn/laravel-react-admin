<?php

namespace App\Http\Controllers\Api\Admin;

use Exception;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Repositories\Admin\Category\CategoryRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    protected $categoryRepository;

    public function __construct(CategoryRepositoryInterface $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    private function errorResponse($e)
    {
        Log::error($e->getMessage());
        return response()->json([$e->getMessage()], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
    }

    
    public function getAllCategories()
    {
        try {
            $categories = $this->categoryRepository->getAll();
            return response()->json($categories, JsonResponse::HTTP_OK);
        } catch (Exception $e) {
            return $this->errorResponse($e);
        }
    }

    public function search(Request $request)
    {
        try {
            $searchKeywords = $request->only(['name']);
            $categories     = $this->categoryRepository->searchData($searchKeywords);
            return response()->json($categories, JsonResponse::HTTP_OK);
        } catch (Exception $e) {
            return $this->errorResponse($e);
        }
    }

    public function storeCategory(Request $request)
    {
        try {
            $attributes = $request->only(['category_name']);
            $category   = $this->categoryRepository->create($attributes);
            return response()->json(['id' => $category->id], JsonResponse::HTTP_OK);
        } catch (Exception $e) {
            return $this->errorResponse($e);
        }
    }

    public function showCategory($id)
    {
        try {
            $category = $this->categoryRepository->getOneById($id);
            if (empty($category)) {
                return response()->json([], JsonResponse::HTTP_NOT_FOUND);
            }
            return response()->json($category, JsonResponse::HTTP_OK);
        } catch (Exception $e) {
            return $this->errorResponse($e);
        }
    }

    public function updateCategory(Request $request, $id)
    {
        try {
            $attributes = $request->only(['category_name']);
            $this->categoryRepository->update($id, $attributes);
            return response()->json($request, JsonResponse::HTTP_OK);
        } catch (Exception $e) {
            return $this->errorResponse($e);
        }
    }

    public function categoryNameDuplicateCheck(Request $request)
    {
        try {
            $where = [
                ['category_name', $request->category_name]
            ];
            if (!empty($request->id)) {
                $where[] = ['id', '!=', $request->id];
            }
            $categoryNameExists = $this->categoryRepository->dataExists($where);
            return response()->json($categoryNameExists, JsonResponse::HTTP_OK);
        } catch (Exception $e) {
            return $this->errorResponse($e);
        }
    }

    public function delete(Request $request)
    {
        try {
            $this->categoryRepository->delete($request->id);
            return response()->json([], JsonResponse::HTTP_OK);
        } catch (Exception $e) {
            return $this->errorResponse($e);
        }
    }
}
