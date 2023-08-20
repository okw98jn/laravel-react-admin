<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('名前');
            $table->string('login_id')->unique()->comment('ログインID');
            $table->string('password')->comment('パスワード');
            $table->boolean('status')->default(true)->comment('ステータス 1:有効 0:無効');
            $table->tinyInteger('role')->default(0)->comment('権限 0:管理者 1:一般');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
