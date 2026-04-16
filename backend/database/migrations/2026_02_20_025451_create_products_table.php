<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('category', ['Provider', 'Top Up', 'Aksesoris']);
            $table->decimal('cost_price', 12, 2);
            $table->decimal('selling_price', 12, 2);
            $table->integer('admin_fee')->default(0);
            $table->integer('stock')->default(0);
            $table->integer('min_stock')->default(5);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('products');
    }
};