<?php

use App\Http\Controllers\InstrumentFrontController;
use App\Http\Controllers\ReturnInstrumentFrontController;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LoanFrontController;
use App\Http\Controllers\Auth\SocialiteController;

Route::redirect('/', 'login');

Route::controller(DashboardController::class)->middleware(['auth', 'verified'])->group(function(){
    Route::get('dashboard', 'index')->name('dashboard');
});

// Route::controller(InstrumentFrontController::class)->middleware(['auth', 'verified'])->group(function () {
//     Route::get('instruments', 'index')->name('front.instruments.index');
//     Route::get('instruments/{instrument:slug}','show')->name('front.instruments.show');
// });

Route::controller(LoanFrontController::class)->middleware(['auth', 'verified'])->group(function () {
    Route::get('loans', 'index')->name('front.loans.index');
    Route::get('loans/{loan:loan_code}/detail','show')->name('front.loans.show');
    Route::post('loans/{instrument:slug}/create', 'store')->name('front.loans.store');
});

Route::controller(ReturnInstrumentFrontController::class)->middleware(['auth', 'verified'])->group(function () {
    Route::get('return-instruments', 'index')->name('front.return-instruments.index');
    Route::get('return-instruments/{returnInstrument:return_instrument_code}/detail','show')->name('front.return-instruments.show');
    Route::post('return-instruments/{instrument:slug}/create{loan:loan_code}', 'store')->name('front.return-instruments.store');
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



Route::get('/cart', function () {
    return Inertia::render('Checkout'); 
})->name('cart');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/auth/redirect', [SocialiteController::class,'redirect'])->name('auth.redirect');

Route::get('/auth/google/callback', [SocialiteController::class,'callback']);

Route::get('/instrument/{any}', action: function () {
    return Inertia::render('InstrumentDetail'); 
})->where('any', '.*')->name('front.instruments.show');



require __DIR__.'/auth.php';

require __DIR__.'/admin.php';

Route::prefix('api')->group(function () {
    require __DIR__.'/api.php';
});

