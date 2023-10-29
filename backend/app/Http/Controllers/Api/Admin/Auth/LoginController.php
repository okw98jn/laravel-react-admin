<?php

namespace App\Http\Controllers\Api\Admin\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function login(Request $request)
    {
        //TODOステータス有効チェックする
        $credentials     = $request->only(['login_id', 'password']);
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json(['isAuthenticated' => true], JsonResponse::HTTP_OK);
        }
        return response()->json([], JsonResponse::HTTP_OK);
    }

    protected function username()
    {
        return 'login_id';
    }
}
