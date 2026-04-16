<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransactionDetail extends Model
{
    protected $fillable = [
        'transaction_id', 'item_name', 'note_or_sn',
        'quantity', 'cost_price', 'selling_price',
        'admin_fee', 'subtotal'
    ];

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }
}