<?php

use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\AssignPermissionController;
use App\Http\Controllers\Admin\AssignUserController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\FineController;
use App\Http\Controllers\Admin\FineSettingController;
use App\Http\Controllers\Admin\InstrumentController;
use App\Http\Controllers\Admin\LoanController;
use App\Http\Controllers\Admin\LoanStatisticController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\ReturnInstrumentController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\RouteAccessController;
use App\Http\Controllers\Admin\SupplierController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('admin')->group(function () {

    Route::controller(LoanStatisticController::class)->group(function () {
        Route::get('loan-statistics', 'index')->name('admin.loan-statistics.index');
    });

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

    Route::controller(FineSettingController::class)->group(function () {
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

        Route::get('return-instruments/report', 'report')->name('admin.return-instruments.report');
    });

    Route::controller(FineController::class)->group(function () {
        Route::get('fines/{returnInstrument:return_instrument_code}/create', 'create')->name('admin.fines.create');
    });

    Route::controller(AnnouncementController::class)->group(function () {
        Route::get('announcements', 'index')->name('admin.announcements.index');

        Route::get('announcements/create', 'create')->name('admin.announcements.create');

        Route::post('announcements.create', 'store')->name('admin.announcements.store');

        Route::get('announcements/edit/{announcement}', 'edit')->name('admin.announcements.edit');

        Route::put('announcements/edit/{announcement}', 'update')->name('admin.announcements.update');

        Route::delete('announcements/destroy/{announcement}', 'destroy')->name('admin.announcements.destroy');
    });

    Route::controller(RoleController::class)->group(function () {
        Route::get('roles', 'index')->name('admin.roles.index');

        Route::get('roles/create', 'create')->name('admin.roles.create');

        Route::post('roles.create', 'store')->name('admin.roles.store');

        Route::get('roles/edit/{role}', 'edit')->name('admin.roles.edit');

        Route::put('roles/edit/{role}', 'update')->name('admin.roles.update');

        Route::delete('roles/destroy/{role}', 'destroy')->name('admin.roles.destroy');
    });

    Route::controller(PermissionController::class)->group(function () {
        Route::get('permissions', 'index')->name('admin.permissions.index');

        Route::get('permissions/create', 'create')->name('admin.permissions.create');

        Route::post('permissions.create', 'store')->name('admin.permissions.store');

        Route::get('permissions/edit/{permission}', 'edit')->name('admin.permissions.edit');

        Route::put('permissions/edit/{permission}', 'update')->name('admin.permissions.update');

        Route::delete('permissions/destroy/{permission}', 'destroy')->name('admin.permissions.destroy');
    });

    Route::controller(AssignPermissionController::class)->group(function () {
        Route::get('assign-permissions', 'index')->name('admin.assign-permissions.index');

        Route::get('assign-permissions/edit/{role}', 'edit')->name('admin.assign-permissions.edit');

        Route::put('assign-permissions/edit/{role}', 'update')->name('admin.assign-permissions.update');
    });

    Route::controller(AssignUserController::class)->group(function () {
        Route::get('assign-users', 'index')->name('admin.assign-users.index');

        Route::get('assign-users/edit/{user}', 'edit')->name('admin.assign-users.edit');

        Route::put('assign-users/edit/{user}', 'update')->name('admin.assign-users.update');
    });

    Route::controller(RouteAccessController::class)->group(function () {
        Route::get('route-accesses', 'index')->name('admin.route-accesses.index');

        Route::get('route-accesses/create', 'create')->name('admin.route-accesses.create');

        Route::post('route-accesses.create', 'store')->name('admin.route-accesses.store');

        Route::get('route-accesses/edit/{routeAccess}', 'edit')->name('admin.route-accesses.edit');

        Route::put('route-accesses/edit/{routeAccess}', 'update')->name('admin.route-accesses.update');

        Route::delete('route-accesses/destroy/{routeAccess}', 'destroy')->name('admin.route-accesses.destroy');
    });
});
