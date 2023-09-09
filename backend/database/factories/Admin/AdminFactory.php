<?php

namespace Database\Factories\Admin;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin\Admin;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class AdminFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Admin::class;

    public function definition(): array
    {
        return [
            'name'       => $this->faker->name(),
            'login_id'   => $this->faker->regexify('[A-Za-z0-9]{12}'),
            'password'   => Hash::make('password'),
            'status'     => $this->faker->numberBetween(0,1),
            'role'       => $this->faker->numberBetween(0,1),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
