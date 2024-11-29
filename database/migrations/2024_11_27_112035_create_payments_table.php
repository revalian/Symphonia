<?php

use App\Enums\FinePaymentStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rental_id')->constrained('rentals')->cascadeOnDelete(); // Relasi ke transaksi sewa
            $table->string('payment_code')->unique(); // Kode pembayaran
            $table->decimal('amount_paid', 10, 2); // Jumlah yang dibayar
            $table->string('payment_method'); // Metode pembayaran
            $table->string('status')->default(FinePaymentStatus::PENDING->value); // Status pembayaran
            $table->timestamp('paid_at')->nullable(); // Tanggal pembayaran
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
