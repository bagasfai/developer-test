<?php

use App\Http\Controllers\Api\MarketController;
use App\Http\Controllers\Api\MarketingController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\SaleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware([])->group(function () {
    Route::apiResource('marketings', MarketingController::class);

    Route::apiResource('sales', SaleController::class);

    Route::apiResource('payments', PaymentController::class);

    Route::get('/comissions-summary', [MarketingController::class, 'getCommission']);
    Route::get('/sales/{id}/payments', [PaymentController::class, 'history']);
});
