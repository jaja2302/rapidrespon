<?php

namespace App\Http\Controllers;

use App\Events\Rapidresponsnotification;
use App\Models\Estate;
use App\Models\Jabatan;
use App\Models\Jenistanah;
use App\Models\Laporanrr;
use App\Models\Masalah;
use App\Models\MutuTransport;
use App\Models\Pengguna;
use App\Models\Regional;
use App\Models\Rekomendasi;
use App\Models\Solum;
use App\Models\Topografi;
use App\Models\Wilayah;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class Dashboardcontroller extends Controller
{
    //
    public function index()
    {

        $data = Regional::all();

        return Inertia::render('Dashboard', [
            'data' => $data,
            'canEdit' => can_edit(),
            'canApprove' => can_approve(),
        ]);
    }

    public function getData(Request $request)
    {
        $id = $request->input('id');
        $tanggal = Carbon::parse($request->input('tanggal'))->format('Y-m');
        // dd($tanggal, $id, $request->input('tanggal'));
        // $reg = $id['code'];

        // Fetch Wilayah records with related estates
        $wil = Wilayah::where('regional', $id)->with('Estate')->get();

        $nama_estate = []; // Array to hold the 'est' values

        // Iterate over each Wilayah record
        foreach ($wil as $wilayah) {
            // Iterate over the related estates of the current Wilayah
            foreach ($wilayah->Estate as $estate) {
                // Collect the 'est' value from each Estate
                $nama_estate[] = $estate->est;
            }
        }



        // Fetch data from Jenistanah (this part is independent of the above code)
        $data = Laporanrr::wherein('estate', $nama_estate)
            ->where('datetime', 'like', '%' . $tanggal . '%')
            ->with('Jenistanah', 'Topografi', 'Solum')
            ->orderBy('estate')->get();

        // dd($data);

        $groupedData = $data->groupBy(['estate', 'afdeling'])->toArray();

        // dd($groupedData);

        $result = [];
        foreach ($groupedData as $estate => $afdelingData) {
            foreach ($afdelingData as $afdeling => $data) {
                $masalah = 0;
                $blok = count($data);
                foreach ($data as $value) {
                    // Check if 'masalah' contains a '$' and handle accordingly
                    if (strpos($value['masalah'], '$') !== false) {
                        // Explode by '$' and count the resulting parts
                        $masalahParts = explode('$', $value['masalah']);
                        $masalah += count($masalahParts);
                    } else {
                        // Ensure 'masalah' is treated as an integer
                        $masalah += intval($value['masalah']);
                    }
                }

                $result[] = [
                    'estate' => $estate,
                    'afdeling' => $afdeling,
                    'masalah' => $masalah,
                    'blok' => $blok,
                    'date' => $tanggal
                ];
            }
        }

        // dd($result);

        return response()->json(['data' => $result]);
    }

    public function filterrData(Request $request)
    {
        $estate = $request->input('estate');
        $afdeling = $request->input('afdeling');
        $date = $request->input('date');
        // dd($estate, $afdeling, $date);


        $data = Laporanrr::where('estate', $estate)
            ->where('afdeling', $afdeling)
            ->where('datetime', 'like', '%' . $date . '%')
            ->select(
                'estate',
                'afdeling',
                DB::raw("DATE_FORMAT(datetime, '%Y-%m-%d') as date")
            )
            ->pluck('date')
            ->toArray();

        $data = array_unique($data);
        return response()->json(['data' => $data]);
    }

    public function detailData(Request $request)
    {
        $estate = $request->input('estate');
        $afdeling = $request->input('afdeling');
        $date = $request->input('date');

        $data = Laporanrr::where('estate', $estate)
            ->where('afdeling', $afdeling)
            ->where('datetime', 'like', '%' . $date . '%')
            ->with('Jenistanah', 'Topografi', 'Solum', 'Masalah_tanah', 'Rekomendasi', 'nama_rekomendator', 'nama_verifikator1', 'nama_verifikator2')
            ->get()->toArray();


        return response()->json(['data' => $data]);
    }

    public function getDatainduk(Request $request)
    {
        $jenistanah = Jenistanah::all();
        $topografi = Topografi::all();
        $solum = Solum::all();
        $masalah = Masalah::all();
        $rekomendasi = Rekomendasi::all();
        $rekomendator = Pengguna::whereIn('id_departement', [1, 39, 42, 40])
            ->whereIn('id_jabatan', [29, 32, 28, 26, 25, 22, 21, 20, 19])
            ->select('user_id as id', 'nama_lengkap as nama_rekomendator')
            ->get();

        // Fetch specific data from 'jabatan' table from another database connection
        $pendamping = Jabatan::whereIn('id', [1, 5, 6, 7, 9, 18])
            ->select('id', 'nama as nama_jabatan')
            ->get();
        $data = [
            'jenistanah' => $jenistanah,
            'topografi' => $topografi,
            'solum' => $solum,
            'masalah' => $masalah,
            'rekomendasi' => $rekomendasi,
            'rekomendator' => $rekomendator,
            'pendamping' => $pendamping,
        ];
        return response()->json(['data' => $data]);
    }

    public function updateData(Request $request)
    {
        if (!can_edit()) {
            return response()->json(['error' => 'Anda tidak memiliki hak akses'], 403);
        }
        $data = $request->input('data');
        // dd($data);
        $newdata = $data[0];
        // dd($newdata['id']);
        // Attempt to find the model instance
        $model = Laporanrr::find($newdata['id']);

        // dd($model, $newdata);
        // Check if the model instance was found
        if (!$model) {
            // Handle the case where the model is not found
            return response()->json(['error' => 'Data not found'], 404);
        }

        $model->jenis_tanah = $newdata['jenistanah']['id'];
        $model->topografi = $newdata['topografi']['id'];
        $model->solum = $newdata['solum']['id'];
        $model->baris = $newdata['baris'];
        $model->no_pkk = $newdata['no_pkk'];
        $model->rekomendator = $newdata['rekomendator'];
        $model->verifikator1 = $newdata['verifikator1'];
        $model->verifikator2 = $newdata['verifikator2'];
        $model->updated_by = auth()->user()->user_id;

        $model->save();
        if ($model) {
            return response()->json(['success' => 'Data updated successfully']);
        } else {
            return response()->json(['error' => 'Failed to update data'], 500);
        }
    }

    public function resend_notif(Request $request)
    {
        $id = $request->input('id');
        $data = Laporanrr::where('id', $id)->first();
        $verifikator1 = Pengguna::where('user_id', $data['verifikator1'])->first();
        $verifikator2 = Pengguna::where('user_id', $data['verifikator2'])->first();
        $blok = explode('$', $request->input('blok'));
        $blok = implode('-', $blok);
        $bot_data = [
            'id' => $data->id,
            'verifikator1' => $verifikator1->no_hp,
            'verifikator2' => $verifikator2->no_hp,
            'nama_verifikator1' => $verifikator1->nama_lengkap,
            'nama_verifikator2' => $verifikator2->nama_lengkap,
            'id_verifikator1' => $verifikator1->user_id,
            'id_verifikator2' => $verifikator2->user_id,
            'rekomendator' => Pengguna::where('user_id', $data['rekomendator'])->first()->nama_lengkap,
            'estate'        => $data['est'],
            'afdeling'      => $data['afd'],
            'blok'          => $blok,
            'baris'         => $data['baris'],
            'masalah'       => Masalah::where('id', $data['masalah'])->first()->nama_masalah,
            'catatan'       => str_replace("|", ",", $data['catatan']),
        ];
        // dd($bot_data);
        event(new Rapidresponsnotification($bot_data));
        return response()->json(['success' => 'Notif resend']);
    }
}
