<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            // Provider
            ['name' => 'Telkomsel 5GB',   'category' => 'Provider',   'cost_price' => 12000, 'selling_price' => 15000, 'stock' => 20],
            ['name' => 'Telkomsel 10GB',  'category' => 'Provider',   'cost_price' => 23000, 'selling_price' => 28000, 'stock' => 15],
            ['name' => 'XL 5GB',          'category' => 'Provider',   'cost_price' => 10000, 'selling_price' => 13000, 'stock' => 3],
            ['name' => 'XL 10GB',         'category' => 'Provider',   'cost_price' => 20000, 'selling_price' => 25000, 'stock' => 8],
            ['name' => 'Indosat 7GB',     'category' => 'Provider',   'cost_price' => 14000, 'selling_price' => 18000, 'stock' => 12],
            ['name' => 'Indosat 15GB',    'category' => 'Provider',   'cost_price' => 26000, 'selling_price' => 32000, 'stock' => 2],
            // Top Up
            ['name' => 'DANA 50rb',       'category' => 'Top Up',     'cost_price' => 50000, 'selling_price' => 50000, 'admin_fee' => 2000, 'stock' => 99],
            ['name' => 'DANA 100rb',      'category' => 'Top Up',     'cost_price' => 100000,'selling_price' => 100000,'admin_fee' => 2000, 'stock' => 99],
            ['name' => 'OVO 50rb',        'category' => 'Top Up',     'cost_price' => 50000, 'selling_price' => 50000, 'admin_fee' => 2000, 'stock' => 99],
            ['name' => 'GoPay 50rb',      'category' => 'Top Up',     'cost_price' => 50000, 'selling_price' => 50000, 'admin_fee' => 2000, 'stock' => 99],
            ['name' => 'GoPay 100rb',     'category' => 'Top Up',     'cost_price' => 100000,'selling_price' => 100000,'admin_fee' => 2000, 'stock' => 99],
            ['name' => 'ShopeePay 50rb',  'category' => 'Top Up',     'cost_price' => 50000, 'selling_price' => 50000, 'admin_fee' => 2000, 'stock' => 99],
            // Aksesoris
            ['name' => 'Case iPhone 15',  'category' => 'Aksesoris',  'cost_price' => 45000, 'selling_price' => 85000, 'stock' => 4],
            ['name' => 'Charger 20W',     'category' => 'Aksesoris',  'cost_price' => 75000, 'selling_price' => 120000,'stock' => 7],
            ['name' => 'Headset Bluetooth','category' => 'Aksesoris', 'cost_price' => 95000, 'selling_price' => 150000,'stock' => 2],
            ['name' => 'Kabel Type-C 1m', 'category' => 'Aksesoris',  'cost_price' => 18000, 'selling_price' => 35000, 'stock' => 10],
            ['name' => 'Anti Gores',      'category' => 'Aksesoris',  'cost_price' => 10000, 'selling_price' => 25000, 'stock' => 1],
            ['name' => 'Power Bank 10000','category' => 'Aksesoris',  'cost_price' => 120000,'selling_price' => 180000,'stock' => 3],
        ];

        foreach ($products as $p) {
            Product::create(array_merge(['min_stock' => 5, 'admin_fee' => 0, 'is_active' => true], $p));
        }
    }
}