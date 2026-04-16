<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::where('is_active', true)->get()->groupBy('category');
        return response()->json([
            'success' => true,
            'data' => $products
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'          => 'required|string',
            'category'      => 'required|in:Provider,Top Up,Aksesoris',
            'cost_price'    => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
            'stock'         => 'required|integer|min:0',
        ]);

        $product = Product::create($request->all());
        return response()->json(['success' => true, 'data' => $product], 201);
    }

    public function update(Request $request, Product $product)
    {
        $product->update($request->all());
        return response()->json(['success' => true, 'data' => $product]);
    }

    public function destroy(Product $product)
    {
        $product->update(['is_active' => false]);
        return response()->json(['success' => true, 'message' => 'Produk dinonaktifkan']);
    }

    public function lowStock()
    {
        $products = Product::where('is_active', true)
            ->whereColumn('stock', '<', 'min_stock')
            ->where('stock', '!=', 99)
            ->get();
        return response()->json(['success' => true, 'data' => $products]);
    }
}