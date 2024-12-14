<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Auth\SocialiteController;

Route::redirect('/','login');

Route::controller(DashboardController::class)->middleware(['auth', 'verified'])->group(function(){
    Route::get('dashboard', 'index')->name('dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get ('/auth/redirect', [SocialiteController::class,'redirect'])->name('auth.redirect');

Route::get('/auth/google/callback', [SocialiteController::class,'callback']);

Route::get('testing', fn()=> inertia('Testing'));

require __DIR__.'/auth.php';

require __DIR__.'/admin.php';
