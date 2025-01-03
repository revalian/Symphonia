<?php

use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\InstrumentController;
use App\Http\Controllers\Api\ReturnInstrumentController;

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

Route::prefix('returninstrument')->group(function () {
    Route::get('/', [ReturnInstrumentController::class, 'index']);
    Route::get('/{id}', [ReturnInstrumentController::class, 'detail']);
});

Route::prefix('user')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::get('/{id}', [UserController::class, 'detail']);
});
