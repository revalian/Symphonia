<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\InstrumentController;
use Illuminate\Support\Facades\Route;

Route::prefix('category')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
    Route::get('/{id}', [CategoryController::class, 'detail']);
    Route::get('/category/{slug}', [CategoryController::class, 'showBySlug']);
});

Route::prefix('instrument')->group(function () {
    Route::get('/', [InstrumentController::class, 'index']);
    Route::get('/{id}', [InstrumentController::class, 'detail']);
});

Route::get('/search', [InstrumentController::class, 'search']);
