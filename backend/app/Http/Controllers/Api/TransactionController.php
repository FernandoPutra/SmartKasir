<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with('details')
            ->latest()
            ->take(50)
            ->get();
        return response()->json(['success' => true, 'data' => $transactions]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'items'          => 'required|array|min:1',
            'items.*.product_id'    => 'required|exists:products,id',
            'items.*.note_or_sn'    => 'nullable|string',
            'payment_method' => 'required|in:cash,qris',
            'status'         => 'required|in:completed,draft',
            'cash_received'  => 'nullable|numeric',
        ]);

        DB::beginTransaction();
        try {
            $totalPrice = 0;
            $totalCost  = 0;
            $details    = [];

            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);

                // Kurangi stok kalau bukan digital (99)
                if ($product->stock !== 99 && $request->status === 'completed') {
                    if ($product->stock < 1) {
                        throw new \Exception("Stok {$product->name} habis!");
                    }
                    $product->decrement('stock');
                }

                $subtotal    = $product->selling_price + $product->admin_fee;
                $totalPrice += $subtotal;
                $totalCost  += $product->cost_price;

                $details[] = [
                    'item_name'     => $product->name,
                    'note_or_sn'    => $item['note_or_sn'] ?? null,
                    'quantity'      => 1,
                    'cost_price'    => $product->cost_price,
                    'selling_price' => $product->selling_price,
                    'admin_fee'     => $product->admin_fee,
                    'subtotal'      => $subtotal,
                ];
            }

            $cashChange = $request->cash_received
                ? $request->cash_received - $totalPrice
                : null;

            $transaction = Transaction::create([
                'total_price'    => $totalPrice,
                'total_cost'     => $totalCost,
                'profit'         => $totalPrice - $totalCost,
                'status'         => $request->status,
                'payment_method' => $request->payment_method,
                'cash_received'  => $request->cash_received,
                'cash_change'    => $cashChange,
            ]);

            $transaction->details()->createMany($details);
            DB::commit();

            return response()->json([
                'success' => true,
                'data'    => $transaction->load('details')
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'message' => $e->getMessage()], 422);
        }
    }

    public function dashboard()
    {
        $today = today();
        $todayTx = Transaction::whereDate('created_at', $today)
            ->where('status', 'completed');

        return response()->json([
            'success' => true,
            'data'    => [
                'today_revenue'      => (clone $todayTx)->sum('total_price'),
                'today_profit'       => (clone $todayTx)->sum('profit'),
                'today_transactions' => (clone $todayTx)->count(),
                'drafts'             => Transaction::where('status', 'draft')->count(),
            ]
        ]);
    }

    public function report(Request $request)
    {
        $days = $request->get('days', 7);
        $data = Transaction::where('status', 'completed')
            ->where('created_at', '>=', now()->subDays($days))
            ->selectRaw('DATE(created_at) as date, SUM(total_price) as omzet, SUM(profit) as profit, COUNT(*) as total')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return response()->json(['success' => true, 'data' => $data]);
    }

    public function drafts()
    {
        $drafts = Transaction::with('details')->where('status', 'draft')->latest()->get();
        return response()->json(['success' => true, 'data' => $drafts]);
    }
}