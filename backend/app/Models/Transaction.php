<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'invoice_number', 'total_price', 'total_cost',
        'profit', 'status', 'payment_method',
        'cash_received', 'cash_change'
    ];

    public function details()
    {
        return $this->hasMany(TransactionDetail::class);
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($tx) {
            $tx->invoice_number = 'INV-' . date('Ymd') . '-' . str_pad(
                static::whereDate('created_at', today())->count() + 1, 4, '0', STR_PAD_LEFT
            );
        });
    }
}