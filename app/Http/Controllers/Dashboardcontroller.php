<?php

namespace App\Http\Controllers;

use App\Models\Estate;
use App\Models\Jenistanah;
use App\Models\MutuTransport;
use App\Models\Regional;
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
            'data' => $data
        ]);
    }

    public function getData(Request $request)
    {
        $id = $request->input('id');
        $tanggal = Carbon::parse($request->input('tanggal'))->format('Y-m');
        // dd($tanggal, $id);
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
        $data = MutuTransport::wherein('estate', $nama_estate)->where('datetime', 'like', '%' . $tanggal . '%')->orderBy('estate')->get();

        $groupedData = $data->groupBy(['estate', 'afdeling'])->toArray();

        $result = [];
        foreach ($groupedData as $estate => $afdelingData) {
            foreach ($afdelingData as $afdeling => $data) {
                $rst = 0;
                $bt = 0;
                $blok = count($data);
                foreach ($data as $val => $value) {
                    $rst += $value['rst'];
                    $bt += $value['bt'];
                }
                $total = $rst + $bt;

                $result[] = [
                    'estate' => $estate,
                    'afdeling' => $afdeling,
                    'restan' => $rst,
                    'brondol' => $bt,
                    'total' => $total,
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


        $data = MutuTransport::where('estate', $estate)
            ->where('afdeling', $afdeling)
            ->where('datetime', 'like', '%' . $date . '%')
            ->select(
                'estate',
                'afdeling',
                DB::raw("DATE_FORMAT(datetime, '%Y-%m-%d') as date")
            )
            ->groupBy('date')
            ->pluck('date')->toArray();

        // $data = MutuTransport::where('estate', $estate)
        //     ->where('afdeling', $afdeling)
        //     ->where('datetime', 'like', '%' . $date . '%')
        //     ->select(
        //         'estate',
        //         'afdeling',
        //         DB::raw("DATE_FORMAT(datetime, '%Y-%m-%d') as date")
        //     )->get()->toArray();
        // dd($data, $date);
        return response()->json(['data' => $data]);
    }

    public function detailData(Request $request)
    {
        $estate = $request->input('estate');
        $afdeling = $request->input('afdeling');
        $date = $request->input('date');

        $data = MutuTransport::where('estate', $estate)
            ->where('afdeling', $afdeling)
            ->where('datetime', 'like', '%' . $date . '%')
            ->get()->toArray();

        // dd($data);

        return response()->json(['data' => $data]);
    }
}
