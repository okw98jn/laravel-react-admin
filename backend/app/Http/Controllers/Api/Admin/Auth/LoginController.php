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
        $credentials     = $request->only(['login_id', 'password']);
        $isAuthenticated = false;
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $isAuthenticated = true;
            $user            = Auth::user();

            return response()->json(['isAuthenticated' => $isAuthenticated, 'user' => $user], JsonResponse::HTTP_OK);
        }
        return response()->json(['isAuthenticated' => $isAuthenticated], JsonResponse::HTTP_OK);
    }

    public function username()
    {
        return 'login_id';
    }
}
