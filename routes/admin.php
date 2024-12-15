<?php 

use App\Http\Controllers\Admin\CategoryController;
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

});