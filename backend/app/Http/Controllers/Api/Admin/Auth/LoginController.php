<?php

namespace App\Http\Controllers\Api\Admin\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\AuthManager;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /**
     * @param AuthManager $auth
     */
    public function __construct(
        private readonly AuthManager $auth,
    ) {
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $credentials = $request->only(['login_id', 'password']);

        // 認証開始
        if ($this->auth->guard()->attempt($credentials)) {
            // セッションIDを再生成
            $request->session()->regenerate();

            // レスポンスを返す
            return new JsonResponse([
                'message' => 'Authenticated.',
            ]);
        }

        // 認証エラーが発生した場合に例外を投げる
        throw new AuthenticationException();
    }
}
