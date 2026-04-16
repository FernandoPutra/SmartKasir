<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('transaction_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transaction_id')->constrained()->cascadeOnDelete();
            $table->string('item_name');
            $table->string('note_or_sn')->nullable();
            $table->integer('quantity')->default(1);
            $table->decimal('cost_price', 12, 2);
            $table->decimal('selling_price', 12, 2);
            $table->decimal('admin_fee', 12, 2)->default(0);
            $table->decimal('subtotal', 12, 2);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('transaction_details');
    }
};