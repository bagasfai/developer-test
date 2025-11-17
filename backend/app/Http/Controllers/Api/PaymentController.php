<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Sale;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Payment::with('sale')->get(), 200);
    }

    public function history($saleId)
    {
        $sale = Sale::findOrFail($saleId);

        $payments = Payment::where('sale_id', $saleId)->orderBy('payment_date', 'asc')->get();

        $totalPaid = $payments->sum('amount');
        $remaining = $sale->grand_total - $totalPaid;

        return response()->json([
            "sale" => $sale,
            "payments" => $payments,
            "total_paid" => $totalPaid,
            "remaining" => $remaining,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'sale_id' => 'required|exists:sales,id',
            'amount' => 'required|numeric|min:1',
            'payment_date' => 'required|date',
            'note' => 'nullable|string',
        ]);

        $sale = Sale::findOrFail($request->sale_id);

        // Hitung total pembayaran sebelumnya
        $totalPaid = Payment::where('sale_id', $sale->id)->sum('amount');
        $remaining = $sale->grand_total - $totalPaid;

        if ($request->amount > $remaining) {
            return response()->json([
                'message' => 'Payment amount exceeds remaining balance.'
            ], 422);
        }

        $payment = Payment::create([
            'sale_id' => $sale->id,
            'amount' => $request->amount,
            'payment_date' => $request->payment_date,
            'note' => $request->note,
        ]);

        $totalPaid += $request->amount;

        $sale->paid_amount = $totalPaid;
        $this->updateSaleStatus($sale);
        $sale->save();

        return response()->json([
            'message' => 'Payment added successfully.',
            'payment' => $payment,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $payment = Payment::findOrFail($id);
        $sale = Sale::findOrFail($payment->sale_id);

        $validated = $request->validate([
            'amount' => 'required|numeric|min:1',
            'payment_date' => 'required|date',
            'note' => 'nullable|string'
        ]);

        $sale->paid_amount -= $payment->amount;

        $remaining = $sale->grand_total - $sale->paid_amount;
        if ($validated['amount'] > $remaining) {
            return response()->json([
                'message' => "Payment exceeds remaining amount. Remaining balance: $remaining"
            ], 422);
        }

        $payment->update($validated);

        $sale->paid_amount += $validated['amount'];
        $this->updateSaleStatus($sale);

        return response()->json([
            'message' => 'Payment updated successfully',
            'payment' => $payment
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $payment = Payment::findOrFail($id);
        $sale = Sale::findOrFail($payment->sale_id);

        $sale->paid_amount -= $payment->amount;
        $this->updateSaleStatus($sale);

        $payment->delete();

        return response()->json(['message' => 'Payment deleted'], 200);
    }

    public function getSalePayments($saleId)
    {
        $sale = Sale::with('payments')->findOrFail($saleId);

        return [
            'sale' => $sale,
            'payments' => $sale->payments,
            'remaining_balance' => $sale->grand_total - $sale->paid_amount,
        ];
    }

    private function updateSaleStatus(Sale $sale)
    {
        if ($sale->paid_amount <= 0) {
            $sale->status = 'UNPAID';
            $sale->paid_amount = 0;
        } elseif ($sale->paid_amount < $sale->grand_total) {
            $sale->status = 'PARTIAL';
        } else {
            $sale->status = 'PAID';
        }

        $sale->save();
    }
}
