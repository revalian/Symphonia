<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Auth\SocialiteController;
use Illuminate\Support\Str;

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



Route::get('/category/{slug}', function ($slug) {
    if (Str::startsWith($slug, 'tradisional')) {
        return Inertia::render('TraditionalInstrumentsPage');
    } elseif (Str::startsWith($slug, 'modern')) {
        return Inertia::render('ModernInstruments');
    }
    abort(404); // Jika slug tidak sesuai
})->name('category');


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

Route::prefix('api')->group(function () {
    require __DIR__.'/api.php';
});

