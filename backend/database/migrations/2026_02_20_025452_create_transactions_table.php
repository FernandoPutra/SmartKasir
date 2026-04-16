<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number')->unique();
            $table->decimal('total_price', 12, 2);
            $table->decimal('total_cost', 12, 2)->default(0);
            $table->decimal('profit', 12, 2)->default(0);
            $table->enum('status', ['completed', 'draft'])->default('draft');
            $table->enum('payment_method', ['cash', 'qris'])->nullable();
            $table->decimal('cash_received', 12, 2)->nullable();
            $table->decimal('cash_change', 12, 2)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('transactions');
    }
};