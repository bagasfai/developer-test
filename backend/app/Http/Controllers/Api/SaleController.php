<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sales = Sale::with('marketing')
            ->orderBy('date', 'desc')
            ->get();

        return response()->json($sales);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'transaction_number' => 'required|string|unique:sales,transaction_number',
            'marketing_id'       => 'required|exists:marketings,id',
            'date'               => 'required|date',
            'cargo_fee'          => 'required|numeric|min:0',
            'total_balance'      => 'required|numeric|min:0',
            'grand_total'        => 'required|numeric|min:0',
        ]);

        $sale = Sale::create($validated);

        return response()->json([
            'message' => 'Created',
            'data' => $sale
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $sale = Sale::with('marketing')->findOrFail($id);

        return response()->json($sale);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $sale = Sale::findOrFail($id);

        $validated = $request->validate([
            'transaction_number' => 'required|string|unique:sales,transaction_number,' . $id,
            'marketing_id'       => 'required|exists:marketings,id',
            'date'               => 'required|date',
            'cargo_fee'          => 'required|numeric|min:0',
            'total_balance'      => 'required|numeric|min:0',
        ]);
        $validated['grand_total'] = $validated['cargo_fee'] + $validated['total_balance'];

        // Total payment existing
        $totalPaid = $sale->payments()->sum('amount');

        // Jika grand_total baru lebih kecil dari total paid → reject
        if ($validated['grand_total'] < $totalPaid) {
            return response()->json([
                'message' => "Cannot update. Payments already exceed new grand total.",
                'total_paid' => $totalPaid,
                'required_minimum' => $totalPaid
            ], 422);
        }

        // Update sale
        $sale->update($validated);

        // Recalculate status
        if ($totalPaid == 0) {
            $sale->status = 'UNPAID';
        } elseif ($totalPaid < $sale->grand_total) {
            $sale->status = 'PARTIAL';
        } else {
            $sale->status = 'PAID';
        }

        $sale->paid_amount = $totalPaid;
        $sale->save();


        return response()->json([
            'message' => 'Updated',
            'data' => $sale
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Sale::findOrFail($id)->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
