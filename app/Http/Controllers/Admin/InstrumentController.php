<?php

namespace App\Http\Controllers\Admin;

use App\Enums\InstrumentOrigin;
use App\Enums\InstrumentStatus;
use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\InstrumentRequest;
use App\Http\Resources\Admin\InstrumentResource;
use App\Models\Category;
use App\Models\Instrument;
use App\Models\Supplier;
use App\Traits\HasFile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Throwable;

class InstrumentController extends Controller
{
    use HasFile;

    public function index()
    {
        $instruments = Instrument::query()
        ->select(['id', 'instrument_code', 'name', 'brand', 'manufacture_year', 'serial_number', 'origin', 'status', 'rental_price_per_day', 'category_id', 'supplier_id', 'created_at'])
        ->filter(request()->only(['search']))
        ->sorting(request()->only(['field', 'direction']))
        ->with(['category', 'stock', 'supplier'])
        ->latest('created_at')
        ->paginate(request()->load ?? 10)
        ->withQueryString();

        return inertia('Admin/Instruments/Index', [
            'page_settings' => [
                'title' => 'Instrument',
                'subtitle' => 'Menampilkan semua data alat musik yang tersedia pada platform ini',
            ],
            'instruments' => InstrumentResource::collection($instruments)->additional([
                'meta' => [
                    'has_pages' => $instruments->hasPages(),
                ],
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10,
            ],
        ]);
    }

    public function create(): Response 
    {
        return inertia('Admin/Instruments/Create', [
            'page_settings' => [
                'title' => 'Tambah Alat Musik',
                'subtitle' => 'Buat buku baru disini. Klik simpan setelah selesai.',
                'method' => 'POST',
                'action' => route('admin.instruments.store'),
            ],

            'page_data' => [
                'manufactureYears' => range(2000, now()->year),
                'origins' => InstrumentOrigin::options(), 
                'categories' => Category::query()->select(['id', 'name'])->get()->map(fn($item) => [
                    'value' => $item->id,
                    'label' => $item->name,

                ]),

                'suppliers' => Supplier::query()->select(['id', 'name'])->get()->map(fn($item) => [
                    'value' => $item->id,
                    'label' => $item->name,

                ]),
            ],
        ]);
    }

    public function store(InstrumentRequest $request): RedirectResponse
    {
        try{
            
            $instrument = Instrument::create([
                'instrument_code' => $this->instrumentCode(
                    $request->manufacture_year,
                    $request->category_id,
                ),
                'name' => $name = $request->name,
                'slug' => str()->lower(str()->slug($name). str()->random(4)),
                'brand' => $request->brand,
                'manufacture_year' => $request->manufacture_year,
                'serial_number' => $request->serial_number,
                'origin' => $request->origin,
                'description' => $request->description,
                'status' => $request->total > 0 ? InstrumentStatus::AVAILABLE->value : InstrumentStatus::UNAVAILABLE->value,
                'image' => $this->upload_file($request, 'image', 'instruments'),
                'rental_price_per_day' => $request->rental_price_per_day,
                'category_id' => $request->category_id,
                'supplier_id' => $request->supplier_id,
            ]);

            $instrument->stock()->create([
                'total' => $total = $request->total,
                'available' => $total
            ]);

            flashMessage(MessageType::CREATED->message('Alat Musik'));
            return to_route('admin.instruments.index');
        } catch (Throwable $e) { 
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return to_route('admin.instruments.index');
        }
    }

        public function edit(Instrument $instrument): Response 
    {
        return inertia('Admin/Instruments/Edit', [
            'page_settings' => [
                'title' => 'Edit Alat Musik',
                'subtitle' => 'Edit alat musik disini. Klik simpan setelah selesai.',
                'method' => 'Put',
                'action' => route('admin.instruments.update', $instrument),
            ],
            'instrument' => $instrument,
            'page_data' => [
                'manufactureYears' => range(2000, now()->year),
                'origins' => InstrumentOrigin::options(), 
                'categories' => Category::query()->select(['id', 'name'])->get()->map(fn($item) => [
                    'value' => $item->id,
                    'label' => $item->name,

                ]),

                'suppliers' => Supplier::query()->select(['id', 'name'])->get()->map(fn($item) => [
                    'value' => $item->id,
                    'label' => $item->name,

                ]),
            ],
        ]);
    }

    public function update(Instrument $instrument, InstrumentRequest $request): RedirectResponse
    {
        try{
            
            $instrument->update([
                'instrument_code' => $this->instrumentCode(
                    $request->manufacture_year,
                    $request->category_id,
                ),
                'name' => $name = $request->name,
                'slug' => $name != $instrument->name ? str()->lower(str()->slug($name). str()->random(4)) : $instrument->slug,
                'brand' => $request->brand,
                'manufacture_year' => $request->manufacture_year,
                'serial_number' => $request->serial_number,
                'origin' => $request->origin,
                'description' => $request->description,
                'status' => $request->total > 0 ? InstrumentStatus::AVAILABLE->value : InstrumentStatus::UNAVAILABLE->value,
                'image' => $this->update_file($request,$instrument, 'image', 'instruments'),
                'rental_price_per_day' => $request->rental_price_per_day,
                'category_id' => $request->category_id,
                'supplier_id' => $request->supplier_id,
            ]);

            flashMessage(MessageType::UPDATED->message('Alat Musik'));
            return to_route('admin.instruments.index');
        } catch (Throwable $e) { 
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return to_route('admin.instruments.index');
        }
    }

    public function destroy (Instrument $instrument): RedirectResponse
    {
        try{
            $this->delete_file($instrument, 'image');
            $instrument->delete();

            flashMessage(MessageType::DELETED->message('instrument'));
            return to_route('admin.instruments.index');
        } catch (Throwable $e){
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return to_route('admin.instruments.index');
        }
    }


    private function instrumentCode(int $manufacture_year, int $category_id): string
    {
        $category = Category::find($category_id);

        $last_instrument = Instrument::query()

        ->orderByDesc('instrument_code')
        ->first();

        $oder = 1;

        if($last_instrument) {
            $last_order = (int) substr($last_instrument->instrument_code, -4);
            $order = $last_order + 1;
        }

        $ordering = str_pad($oder, 4, '0'. STR_PAD_LEFT);
        return 'SY' . $manufacture_year. '.' . str()->slug($category->name). '.'.$ordering;
    }

}
