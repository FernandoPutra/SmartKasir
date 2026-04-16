<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'category', 'cost_price',
        'selling_price', 'admin_fee', 'stock',
        'min_stock', 'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function getLowStockAttribute(): bool
    {
        return $this->stock < $this->min_stock && $this->stock !== 99;
    }
}