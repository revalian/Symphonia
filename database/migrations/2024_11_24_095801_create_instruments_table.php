<?php

use App\Enums\InstrumentOrigin;
use App\Enums\InstrumentStatus;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('instruments', function (Blueprint $table) {
            $table->id();
            $table->string('instrument_code')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('brand');
            $table->unsignedInteger('manufacture_year');
            $table->string('serial_number');
            $table->string('origin')->default(InstrumentOrigin::INDONESIA->value);
            $table->text('description')->nullable();
            $table->string('status')->default(InstrumentStatus::AVAILABLE->value);
            $table->string('image')->nullable();
            $table->decimal('rental_price_per_day', 10, 2); // Harga per hari
            $table->foreignId('category_id')->constrained('categories')->cascadeOnDelete();
            $table->foreignId('supplier_id')->nullable()->constrained('suppliers')->onDelete('set null');
            $table->timestamps();
        });
        
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('instruments');
    }
};
