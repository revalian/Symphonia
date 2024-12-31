<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CategoryRequest;
use App\Http\Resources\Admin\CategoryResource;
use App\Models\Category;
use App\Traits\HasFile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Throwable;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    use HasFile;

    public function index(): Response
    {
        $load = is_numeric(request()->load) && request()->load > 0 ? request()->load : 10;

        $categories = Category::query()
            ->select(['id', 'name', 'slug', 'cover', 'created_at'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate($load)
            ->withQueryString();

        return inertia('Admin/Categories/Index', [
            'categories' => CategoryResource::collection($categories)->additional([
                'meta' => [
                    'has_pages' => $categories->hasPages(),
                ],
            ]),
            'page_settings' => [
                'title' => 'Kategori',
                'subtitle' => "Menampilkan semua data kategori yang tersedia pada platform ini",
            ],
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => $load,
            ],
        ]);
    }

    public function create(): Response
    {
        return inertia('Admin/Categories/Create', [
            'page_settings' => [
                'title' => 'Tambah Kategori',
                'subtitle' => 'Buat kategori baru di sini. Klik simpan setelah selesai.',
                'method' => 'POST',
                'action' => route('admin.categories.store'),
            ],
        ]);
    }

    public function store(CategoryRequest $request): RedirectResponse
    {
        try {
            Category::create([
                'name' => $name = $request->name,
                'slug' => Str::lower(Str::slug($name) . Str::random(4)),
                'description' => $request->description,
                'cover' => $this->upload_file($request, 'cover', 'categories'),
            ]);

            flashMessage(MessageType::CREATED->message('kategori'));
            return to_route('admin.categories.index');
        } catch (Throwable $e) {
            logger()->error('Error creating category:', ['exception' => $e]);
            flashMessage(MessageType::ERROR->message(error: 'Gagal menyimpan kategori.'), 'error');
            return to_route('admin.categories.index');
        }
    }

    public function edit(Category $category): Response
    {
        return inertia('Admin/Categories/Edit', [
            'page_settings' => [
                'title' => 'Edit Kategori',
                'subtitle' => 'Edit kategori di sini. Klik simpan setelah selesai.',
                'method' => 'PUT',
                'action' => route('admin.categories.update', $category),
            ],
            'category' => $category,
        ]);
    }

    public function update(Category $category, CategoryRequest $request): RedirectResponse
    {
        try {
            $category->update([
                'name' => $name = $request->name,
                'slug' => $name !== $category->name ? Str::lower(Str::slug($name) . Str::random(4)) : $category->slug,
                'description' => $request->description,
                'cover' => $this->update_file($request, $category, 'cover', 'categories'),
            ]);

            flashMessage(MessageType::UPDATED->message('kategori'));
            return to_route('admin.categories.index');
        } catch (Throwable $e) {
            logger()->error('Error updating category:', ['exception' => $e]);
            flashMessage(MessageType::ERROR->message(error: 'Gagal memperbarui kategori.'), 'error');
            return to_route('admin.categories.index');
        }
    }

    public function destroy(Category $category): RedirectResponse
    {
        try {
            $this->delete_file($category, 'cover');
            $category->delete();

            flashMessage(MessageType::DELETED->message('Kategori'));
            return to_route('admin.categories.index');
        } catch (Throwable $e) {
            logger()->error('Error deleting category:', ['exception' => $e]);
            flashMessage(MessageType::ERROR->message(error: 'Gagal menghapus kategori.'), 'error');
            return to_route('admin.categories.index');
        }
    }
}
