<?php

namespace Database\Factories;

use App\Models\Marketing;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sale>
 */
class SaleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'transaction_number' => $this->faker->unique()->numerify('TRX-#####'),
            'marketing_id' => Marketing::inRandomOrder()->first()->id,
            'date' => $this->faker->dateTimeBetween('2025-01-01', '2025-12-31'),
            'cargo_fee'      => $this->faker->numberBetween(10000, 100000),
            'total_balance'  => $this->faker->numberBetween(1000000, 10000000),
            'grand_total'    => $this->faker->numberBetween(5000000, 200000000),
        ];
    }
}
