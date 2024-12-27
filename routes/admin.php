<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\FineSettingController;
use App\Http\Controllers\Admin\InstrumentController;
use App\Http\Controllers\Admin\LoanController;
use App\Http\Controllers\Admin\ReturnInstrumentController;
use App\Http\Controllers\Admin\SupplierController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('admin')->group(function () {


    Route::controller(CategoryController::class)->group(function () {
        Route::get('categories', 'index')->name('admin.categories.index');

        Route::get('categories/create', 'create')->name('admin.categories.create');

        Route::post('categories.create', 'store')->name('admin.categories.store');

        Route::get('categories/edit/{category}', 'edit')->name('admin.categories.edit');

        Route::put('categories/edit/{category}', 'update')->name('admin.categories.update');

        Route::delete('categories/destroy/{category}', 'destroy')->name('admin.categories.destroy');
    });


    Route::controller(SupplierController::class)->group(function () {
        Route::get('suppliers', 'index')->name('admin.suppliers.index');

        Route::get('suppliers/create', 'create')->name('admin.suppliers.create');

        Route::post('suppliers.create', 'store')->name('admin.suppliers.store');

        Route::get('suppliers/edit/{supplier}', 'edit')->name('admin.suppliers.edit');

        Route::put('suppliers/edit/{supplier}', 'update')->name('admin.suppliers.update');

        Route::delete('suppliers/destroy/{supplier}', 'destroy')->name('admin.suppliers.destroy');
    });

    Route::controller(InstrumentController::class)->group(function () {
        Route::get('instruments', 'index')->name('admin.instruments.index');

        Route::get('instruments/create', 'create')->name('admin.instruments.create');

        Route::post('instruments.create', 'store')->name('admin.instruments.store');

        Route::get('instruments/edit/{instrument}', 'edit')->name('admin.instruments.edit');

        Route::put('instruments/edit/{instrument}', 'update')->name('admin.instruments.update');

        Route::delete('instruments/destroy/{instrument}', 'destroy')->name('admin.instruments.destroy');
    });



    Route::controller(UserController::class)->group(function () {
        Route::get('users', 'index')->name('admin.users.index');

        Route::get('users/create', 'create')->name('admin.users.create');

        Route::post('users.create', 'store')->name('admin.users.store');

        Route::get('users/edit/{user}', 'edit')->name('admin.users.edit');

        Route::put('users/edit/{user}', 'update')->name('admin.users.update');

        Route::delete('users/destroy/{user}', 'destroy')->name('admin.users.destroy');
    });

    Route::controller(FineSettingController::class)->group(function(){
        Route::get('fine-settings/create', 'create')->name('admin.fine-settings.create');
        Route::put('fine-settings/create', 'store')->name('admin.fine-settings.store');

    });

    Route::controller(LoanController::class)->group(function () {
        Route::get('loans', 'index')->name('admin.loans.index');

        Route::get('loans/create', 'create')->name('admin.loans.create');

        Route::post('loans.create', 'store')->name('admin.loans.store');

        Route::get('loans/edit/{loan}', 'edit')->name('admin.loans.edit');

        Route::put('loans/edit/{loan}', 'update')->name('admin.loans.update');

        Route::delete('loans/destroy/{loan}', 'destroy')->name('admin.loans.destroy');
    });

    Route::controller(ReturnInstrumentController::class)->group(function () {
        Route::get('return-instruments', 'index')->name('admin.return-instruments.index');

        Route::get('return-instruments/{loan:loan_code}/create', 'create')->name('admin.return-instruments.create');

        Route::put('return-instruments/{loan:loan_code}/create', 'store')->name('admin.return-instruments.store');

        Route::put('return-instruments/{returnInstrument:return_instrument_code}/approve', 'approve')->name('admin.return-instruments.approve');

    });
});
