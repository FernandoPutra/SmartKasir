<?php

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\TransactionController;
use Illuminate\Support\Facades\Route;

// Products
Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);
Route::put('/products/{product}', [ProductController::class, 'update']);
Route::delete('/products/{product}', [ProductController::class, 'destroy']);
Route::get('/products/low-stock', [ProductController::class, 'lowStock']);

// Transactions
Route::get('/transactions', [TransactionController::class, 'index']);
Route::post('/transactions', [TransactionController::class, 'store']);
Route::get('/transactions/drafts', [TransactionController::class, 'drafts']);
Route::get('/dashboard', [TransactionController::class, 'dashboard']);
Route::get('/report', [TransactionController::class, 'report']);