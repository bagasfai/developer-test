<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Marketing;
use App\Models\Sale;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MarketingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Marketing::orderBy('id', 'desc')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $marketing = Marketing::create($validated);

        return response()->json([
            'message' => 'Created',
            'data' => $marketing
        ], 201);
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
        $marketing = Marketing::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $marketing->update($validated);

        return response()->json([
            'message' => 'Updated',
            'data' => $marketing
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $marketing = Marketing::findOrFail($id);

        $marketing->delete();

        return response()->json(['message' => 'Deleted']);
    }

    public function getCommission(Request $request)
    {
        $year = $request->year ?? now()->year;

        $marketings = Marketing::all();

        $sales = Sale::selectRaw("
            marketing_id,
            MONTH(date) as month_number,
            SUM(grand_total) as omset
        ")
            ->whereYear('date', $year)
            ->groupBy('marketing_id', 'month_number')
            ->get()
            ->groupBy('marketing_id');

        $months = collect(range(1, 12))->mapWithKeys(fn($m) => [$m => [
            'month' => date('F', mktime(0, 0, 0, $m, 1)),
            'omset' => 0,
            'commission_percentage' => 0,
            'commission_amount' => 0
        ]]);

        $result = $marketings->map(function ($marketing) use ($sales, $months) {

            $monthly = $months->map(function ($template, $month) use ($marketing, $sales) {

                $data = $sales[$marketing->id][$month - 1] ?? null;

                if (!$data) return $template;

                $percent = $this->getCommissionPercent($data->omset);

                return [
                    'month' => $template['month'],
                    'omset' => $data->omset,
                    'commission_percentage' => $percent,
                    'commission_amount' => $data->omset * ($percent / 100)
                ];
            })->values();

            return [
                'marketing_id' => $marketing->id,
                'marketing_name' => $marketing->name,
                'summary' => [
                    'total_omset' => $monthly->sum('omset'),
                    'total_commission' => $monthly->sum('commission_amount')
                ],
                'monthly' => $monthly
            ];
        });

        return response()->json($result);
    }

    private function getCommissionPercent($omset)
    {
        if ($omset >= 500000000) return 10;
        if ($omset >= 200000000) return 5;
        if ($omset >= 100000000) return 2.5;
        return 0;
    }
}
