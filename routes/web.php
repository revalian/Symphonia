<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Auth\SocialiteController;

Route::redirect('/', 'login');

Route::controller(DashboardController::class)->middleware(['auth', 'verified'])->group(function(){
    Route::get('dashboard', 'index')->name('dashboard');
});

Route::get('/', function () {
    return Inertia::render('LandingPage');
});

Route::get('/AboutUs', function () {
    return Inertia::render('AboutUs');  
});

Route::get('/tradisional', function () {
    return Inertia::render('TraditionalInstrumentsPage');
})->name('tradisional');

Route::get('/modern', function () {
    return Inertia::render('ModernInstruments');
})->name('modern');

Route::get('/checkout', function () {
    return Inertia::render('Checkout'); 
})->name('checkout');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/auth/redirect', [SocialiteController::class,'redirect'])->name('auth.redirect');

Route::get('/auth/google/callback', [SocialiteController::class,'callback']);


require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
