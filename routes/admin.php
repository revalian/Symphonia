<?php 

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\InstrumentController;
use App\Http\Controllers\Admin\SupplierController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('admin')->group(function(){


    Route::controller(CategoryController::class)->group(function(){
        Route::get('categories','index')->name('admin.categories.index');

        Route::get('categories/create','create')->name('admin.categories.create');

        Route::post('categories.create','store')->name('admin.categories.store');

        Route::get('categories/edit/{category}','edit')->name('admin.categories.edit');

        Route::put('categories/edit/{category}','update')->name('admin.categories.update');
        
        Route::delete('categories/destroy/{category}','destroy')->name('admin.categories.destroy');
        
    });


    Route::controller(SupplierController::class)->group(function(){
        Route::get('suppliers','index')->name('admin.suppliers.index');

        Route::get('suppliers/create','create')->name('admin.suppliers.create');

        Route::post('suppliers.create','store')->name('admin.suppliers.store');

        Route::get('suppliers/edit/{supplier}','edit')->name('admin.suppliers.edit');

        Route::put('suppliers/edit/{supplier}','update')->name('admin.suppliers.update');
        
        Route::delete('suppliers/destroy/{supplier}','destroy')->name('admin.suppliers.destroy');
        
    });

    Route::controller(InstrumentController::class)->group(function(){
        Route::get('instruments','index')->name('admin.instruments.index');

        Route::get('instruments/create','create')->name('admin.instruments.create');

        Route::post('instruments.create','store')->name('admin.instruments.store');

        Route::get('instruments/edit/{instrument}','edit')->name('admin.instruments.edit');

        Route::put('instruments/edit/{instrument}','update')->name('admin.instruments.update');
        
        Route::delete('instruments/destroy/{instrument}','destroy')->name('admin.instruments.destroy');
        
    });

});