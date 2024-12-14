<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Requests\Admin\SupplierRequest;
use App\Http\Resources\Admin\SupplierResource;
use App\Models\Supplier;
use App\Traits\HasFile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Response;
use Throwable;

class SupplierController extends Controller
{
    use HasFile;
    public function index(): Response
    {
        $suppliers=Supplier::query()
        ->select(['id', 'name', 'slug', 'address', 'email', 'phone', 'created_at'])
        ->filter(request()->only(['search']))
        ->sorting(request()->only(['field', 'direction']))
        ->latest('created_at')
        ->paginate(request()->load ?? 10)
        ->withQueryString();
        return inertia('Admin/Suppliers/Index',[
            'page_settings' => [
                'title' => 'Pemasok',
                'subtitle' => 'Menampilkan semua data pemasok yang tersedia pada platform ini',
            ],
            'suppliers' => SupplierResource::collection($suppliers)-> additional([
                'meta'=>[
                    'has_pages'=>$suppliers->hasPages(),

                ],
            ]),
            'state' => [
                'page'=> request()->page ?? 1,
                'search' => request()-> search ?? '',
                'load'=> 10,

            ],
        ]);
    }

    public function create(): Response 
    {
        return inertia('Admin/Suppliers/Create', [
            'page_settings' => [
                'title' => 'Tambah Pemasok',
                'subtitle' => 'Buat pemasok baru disini. Klik simpan setelah selesai',
                'method' => 'POST',
                'action' => route('admin.suppliers.store'),
            ],
        ]);
    }

    public function store(SupplierRequest $request): RedirectResponse
    {
        try{

            Supplier::create([
                'name' => $name = $request->name,
                'slug' => str()->lower(str()->slug($name) . str()->random(4)),
                'address' => $request->address,
                'email' => $request->email,
                'phone' => $request->phone,
                'logo' => $this->upload_file($request, 'logo', 'suppliers'),
            ]);

            flashMessage(MessageType::CREATED->message('Pemasok'));
            return to_route('admin.suppliers.index');

        } catch (Throwable $e){

            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return to_route('admin.suppliers.index');

        }
    }

    public function edit(Supplier $supplier): Response 

    {
        return inertia('Admin/Suppliers/Edit', [
            'page_settings' => [
                'title' => 'Edit Penerbit',
                'subtitle' => 'Edit penerbit disini. Klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.suppliers.update', $supplier),
            ],
            'supplier' => $supplier,
        ]);
    }

    public function update(Supplier $supplier, SupplierRequest $request): RedirectResponse
    {
        try{

            $supplier->update([
                'name' => $name = $request->name,
                'slug' => $name != $supplier->name ? str()->lower(str()->slug($name) . str()->random(4)) : $supplier->slug,
                'address' => $request->address,
                'email' => $request->email,
                'phone' => $request->phone,
                'logo' => $this->update_file($request,$supplier, 'logo', 'suppliers'),
            ]);

            flashMessage(MessageType::UPDATED->message('Pemasok'));
            return to_route('admin.suppliers.index');

        } catch (Throwable $e){

            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return to_route('admin.suppliers.index');

        }
    }

    public function destroy(Supplier $supplier): RedirectResponse
    {
        try{
            $this->delete_file($supplier, 'logo');
            $supplier->delete();
            flashMessage(MessageType::DELETED->message('Pemasok'));
            return to_route('admin.suppliers.index');

        } catch(Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return to_route('admin.suppliers.index');
        }
    }
}
