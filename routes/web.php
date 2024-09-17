<?php

use App\Http\Controllers\Dashboardcontroller;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->name('dashboard');
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\Dashboardcontroller::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('get-data', [DashboardController::class, 'getData'])->name('get-data');
    Route::get('detailData', [DashboardController::class, 'detailData'])->name('detailData');
    Route::get('filterrData', [DashboardController::class, 'filterrData'])->name('filterrData');
    Route::get('getDatainduk', [DashboardController::class, 'getDatainduk'])->name('getDatainduk');
    Route::get('getRekomendasi', [DashboardController::class, 'getRekomendasi'])->name('getRekomendasi');
    Route::post('updateData', [DashboardController::class, 'updateData'])->name('updateData');
    Route::post('resend_notif', [DashboardController::class, 'resend_notif'])->name('resend_notif');
});


Route::get('/uikit/button', function () {
    return Inertia::render('main/uikit/button/page');
})->name('button');





require __DIR__ . '/auth.php';
