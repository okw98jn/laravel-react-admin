<?php

namespace App\Http\Controllers\Api\Admin\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\AuthManager;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LogoutController extends Controller
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
        // ユーザーが認証されていない場合
        if ($this->auth->guard()->guest()) {
            return new JsonResponse([
                'message' => 'Already Unauthenticated.',
            ]);
        }

        // ログアウトする
        $this->auth->guard()->logout();
        // セッションを無効にする
        $request->session()->invalidate();
        // CSRFトークンを再生成する
        $request->session()->regenerateToken();

        return new JsonResponse([
            'message' => 'Unauthenticated.',
        ]);
    }
}
